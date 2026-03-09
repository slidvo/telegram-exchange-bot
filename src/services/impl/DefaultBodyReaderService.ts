import type { IncomingMessage } from "node:http";
import type { BodyReaderService } from "../BodyReaderService.js";

export default class DefaultBodyReaderService implements BodyReaderService {
  //TODO body can be not a JSON
  readBody<T>(req: IncomingMessage): Promise<T> {
    return new Promise((resolve, reject) => {
      let data = "";

      req.on("data", (chunk) => {
        data += chunk;
      });

      req.on("end", () => {
        try {
          const body = JSON.parse(data) as T;

          resolve(body);
        } catch (error) {
          reject(error);
        }
      });

      req.on("error", reject);
    });
  }
}
