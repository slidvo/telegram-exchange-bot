import type { IncomingMessage } from "node:http";
import type RequestBody from "../../model/RequestBody.js";
import type { RequestBodyService } from "../RequestBodyService.js";

export default class DefaultRequestBodyService implements RequestBodyService {
  readRequestBody(req: IncomingMessage): Promise<RequestBody> {
    return new Promise((resolve, reject) => {
      let data = "";

      req.on("data", (chunk) => {
        data += chunk;
      });

      req.on("end", () => {
        try {
          const body = JSON.parse(data) as RequestBody;
          resolve(body);
        } catch (error) {
          reject(error);
        }
      });

      req.on("error", reject);
    });
  }
}
