import type { IncomingMessage, ServerResponse } from "node:http";
import type { RouteAction } from "../types/types.js";

export interface Route {
  path: string;
  method: string;
  action: RouteAction;
}
