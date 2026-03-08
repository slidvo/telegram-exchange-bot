import type { IncomingMessage } from "node:http";
import type { RequestBodyService } from "../RequestBodyService.js";

export default class DefaultRequestBodyService implements RequestBodyService {
  readRequestBody<T>(req: IncomingMessage): Promise<T> {
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
