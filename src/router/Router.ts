import type { IncomingMessage, ServerResponse } from "node:http";
import type { ActionsProvider } from "../providers/ActionsProvider.js";
import type { RouteAction } from "../types/types.js";
import log from "../utils/logger.js";

export class Router {
  constructor(private actionsProvider: ActionsProvider) {}

  async handleRoute(
    req: IncomingMessage,
    res: ServerResponse,
    url: URL,
  ): Promise<void> {
    log.DEBUG(`url.pathname = ${url.pathname}`);

    const action = this.actionsProvider
      .getActionsMap<RouteAction>()
      .get(url.pathname);

    if (action && req.method === action.method) {
      await action.execute(req, res);
    } else {
      res.writeHead(404);
      res.end("Not found");
    }
  }
}
