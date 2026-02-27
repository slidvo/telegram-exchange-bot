import type { IncomingMessage, ServerResponse } from "node:http";
export type RouteAction = (
  res: ServerResponse,
  req?: IncomingMessage,
) => Promise<void>;
