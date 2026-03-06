import type { IncomingMessage } from "node:http";
import type Update from "../dto/Update.js";

export interface RequestBodyService {
  readRequestBody(req: IncomingMessage): Promise<Update>;
}
