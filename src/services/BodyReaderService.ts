import type { IncomingMessage } from "node:http";

export interface BodyReaderService {
  readBody<T>(incomingMessage: IncomingMessage): Promise<T>;
}
