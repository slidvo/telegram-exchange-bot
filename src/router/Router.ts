import type { IncomingMessage, ServerResponse } from "node:http";
import type { SlidwoCurrencyBotActionsProvider } from "../services/SlidwoCurrencyBotActionsProvider.js";

export class Router {
  constructor(
    private slidwoCurrencyBotActionsProvider: SlidwoCurrencyBotActionsProvider,
  ) {}

  async handleRoute(
    req: IncomingMessage,
    res: ServerResponse,
    url: URL,
  ): Promise<void> {
    console.log(`DEBUG: url.pathname = ${url.pathname}`);
    const actionsMap = this.slidwoCurrencyBotActionsProvider.getActionsMap();
    const action = actionsMap.get(url.pathname);

    if (action && req.method === action.method) {
      await action.apply(res, req);
    } else {
      res.writeHead(404);
      res.end("Not found");
    }
  }
}
