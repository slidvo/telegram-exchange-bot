import type { IncomingMessage, ServerResponse } from "node:http";
import type { Update } from "../dto/Update.js";
export interface RouteAction {
  method: string;
  apply: (req: IncomingMessage, res: ServerResponse) => Promise<void>;
}

export interface CommandAction {
  apply: (update: Update) => void;
}
