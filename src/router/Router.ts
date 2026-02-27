import type { IncomingMessage, ServerResponse } from "node:http";
import { routeActionsMap } from "../utils/routesActions.js";

export class Router {
  constructor() {}

  async handleRoute(
    req: IncomingMessage,
    res: ServerResponse,
    url: URL,
  ): Promise<void> {
    console.log(`DEBUG: url.pathname = ${url.pathname}`);
    const action = routeActionsMap.get(url.pathname);

    if (action && req.method === action.method) {
      await action.apply(res);
    } else {
      res.writeHead(404);
      res.end("Not found");
    }
  }
}
