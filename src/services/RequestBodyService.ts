import type { IncomingMessage } from "node:http";
import type RequestBody from "../model/RequestBody.js";

export interface RequestBodyService {
  readRequestBody(req: IncomingMessage): Promise<RequestBody>;
}
