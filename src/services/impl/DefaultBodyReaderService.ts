import type { IncomingMessage } from "node:http";
import type { BodyReaderService } from "../BodyReaderService.js";

export default class DefaultBodyReaderService implements BodyReaderService {
  //TODO body can be not a JSON
  readBody<T>(incomingMessage: IncomingMessage): Promise<T> {
    return new Promise((resolve, reject) => {
      let data = "";

      incomingMessage.on("data", (chunk) => {
        data += chunk;
      });

      incomingMessage.on("end", () => {
        try {
          const body = JSON.parse(data) as T;

          resolve(body);
        } catch (error) {
          reject(error);
        }
      });

      incomingMessage.on("error", reject);
    });
  }
}
