import type { IncomingMessage } from "node:http";

export interface BodyReaderService {
  readBody<T>(req: IncomingMessage): Promise<T>;
}
