import type { IncomingMessage } from "node:http";

export interface BodyReaderService {
  readBody(incomingMessage: IncomingMessage): Promise<unknown>;
}
