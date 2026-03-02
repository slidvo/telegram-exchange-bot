import type { IncomingMessage, ServerResponse } from "node:http";
import type { RouteAction } from "../types/types.js";

export class Router {
  constructor(private routeActionsMap: Map<string, RouteAction>) {}

  async handleRoute(
    req: IncomingMessage,
    res: ServerResponse,
    url: URL,
  ): Promise<void> {
    console.log(`DEBUG: url.pathname = ${url.pathname}`);
    const action = this.routeActionsMap.get(url.pathname);

    if (action && req.method === action.method) {
      await action.apply(res, req);
    } else {
      res.writeHead(404);
      res.end("Not found");
    }
  }
}
