import type { IncomingMessage, ServerResponse } from "node:http";
import type { ActionsProvider } from "../providers/ActionsProvider.js";

export class Router {
  constructor(private actionsProvider: ActionsProvider) {}

  async handleRoute(
    req: IncomingMessage,
    res: ServerResponse,
    url: URL,
  ): Promise<void> {
    console.log(`DEBUG: url.pathname = ${url.pathname}`);

    const action = this.actionsProvider.getRouteActionsMap().get(url.pathname);

    if (action && req.method === action.method) {
      await action.apply(req, res);
    } else {
      res.writeHead(404);
      res.end("Not found");
    }
  }
}
