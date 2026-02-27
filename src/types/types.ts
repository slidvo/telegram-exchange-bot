import type { IncomingMessage, ServerResponse } from "node:http";
export interface RouteAction {
  method: string;
  apply: (res: ServerResponse, req?: IncomingMessage) => Promise<void>;
}
