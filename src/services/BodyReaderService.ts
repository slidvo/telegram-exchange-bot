import type { IncomingMessage } from "node:http";

export interface BodyReaderService {
  readRequestBody<T>(req: IncomingMessage): Promise<T>;

  readBody(msg: IncomingMessage): Promise<string>;
}
