import type { IncomingMessage } from "node:http";

export interface RequestBodyService {
  readRequestBody<T>(req: IncomingMessage): Promise<T>;

  readBody(msg: IncomingMessage): Promise<string>;
}
