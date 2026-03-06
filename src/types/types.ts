import type { IncomingMessage, ServerResponse } from "node:http";
export interface RouteAction {
  method: string;
  apply: (req: IncomingMessage, res: ServerResponse) => Promise<void>;
}
