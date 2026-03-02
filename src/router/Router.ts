import type { IncomingMessage, ServerResponse } from "node:http";
import type { ActionsProvider } from "../providers/ActionsProvider.js";
import type { RouteAction } from "../types/types.js";

export class Router {
  private actionsMap: Map<string, RouteAction>;
  constructor(private actoinsProvider: ActionsProvider) {
    this.actionsMap = actoinsProvider.getRouteActionsMap();
  }

  async handleRoute(
    req: IncomingMessage,
    res: ServerResponse,
    url: URL,
  ): Promise<void> {
    console.log(`DEBUG: url.pathname = ${url.pathname}`);

    const action = this.actionsMap.get(url.pathname);

    if (action && req.method === action.method) {
      await action.apply(res, req);
    } else {
      res.writeHead(404);
      res.end("Not found");
    }
  }
}
