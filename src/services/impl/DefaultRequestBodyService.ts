import type { IncomingMessage } from "node:http";
import type { Update } from "../../dto/Update.js";
import type { RequestBodyService } from "../RequestBodyService.js";

export default class DefaultRequestBodyService implements RequestBodyService {
  readRequestBody<Update>(req: IncomingMessage): Promise<Update> {
    return new Promise((resolve, reject) => {
      let data = "";

      req.on("data", (chunk) => {
        data += chunk;
      });

      req.on("end", () => {
        try {
          const body = JSON.parse(data) as Update;
          console.log(body);
          resolve(body);
        } catch (error) {
          reject(error);
        }
      });

      req.on("error", reject);
    });
  }
}
