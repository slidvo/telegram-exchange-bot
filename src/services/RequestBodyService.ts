import type { IncomingMessage } from "node:http";
import type Update from "../dto/Update.js";

export interface RequestBodyService {
  readRequestBody<T>(req: IncomingMessage): Promise<T>;
}
