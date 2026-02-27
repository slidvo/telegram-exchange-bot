import type { IncomingMessage, ServerResponse } from "node:http";
import type { Route } from "../model/Route.js";

export type Routes = Array<Route>;

export type RouteAction = (
  req: IncomingMessage,
  res: ServerResponse,
) => Promise<void>;
