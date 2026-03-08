import type { IncomingMessage, ServerResponse } from "node:http";
import type { Update } from "../dto/Update.js";
export interface RouteAction {
  method: string;
  execute: (req: IncomingMessage, res: ServerResponse) => Promise<void>;
}

export interface CommandAction {
  execute: (update: Update) => void;
}
