import type { IncomingMessage, ServerResponse } from "node:http";
import type { Route } from "../model/Route.js";
import { MockCurrencyClient } from "../clients/MockCurrencyClient.js";

const routesMap: Map<string, Route> = new Map();
routesMap.set(
  "/metalamp-study/telegram-exchange-bot/hello-world",
  genHelloWorldRoute(),
);
routesMap.set(
  "/metalamp-study/telegram-exchange-bot/latest/rates",
  genLatestRatesRoute(new MockCurrencyClient()),
);

export class Router {
  constructor() {}

  async handleRoute(
    req: IncomingMessage,
    res: ServerResponse,
    url: URL,
  ): Promise<void> {
    console.log(`DEBUG: url.pathname = ${url.pathname}`);
    const route = routesMap.get(url.pathname);

    if (route && req.method == "GET") {
      await route.action(req, res);
    } else {
      res.writeHead(404);
      res.end("Not found");
    }
  }
}

function genHelloWorldRoute(): Route {
  return {
    method: "GET",
    path: "/metalamp-study/telegram-exchange-bot/hello-world",
    action: async (req, res) => {
      return new Promise((resolve) => {
        res.writeHead(200, { "Content-type": "test/plain" });
        res.end("Hello World!\n");
        resolve();
      });
    },
  };
}
function genLatestRatesRoute(currencyClient: MockCurrencyClient): Route {
  return {
    method: "GET",
    path: "/metalamp-study/telegram-exchange-bot/latest/rates",
    action: async (req, res) => {
      return new Promise(async (resolve) => {
        const response = await currencyClient.getLatestRates();
        console.log(`DEBUG: response ${JSON.stringify(response)}`);
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify(response));
        resolve();
      });
    },
  };
}
