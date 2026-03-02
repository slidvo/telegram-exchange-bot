import { MockCurrencyClient } from "../clients/MockCurrencyClient.js";
import type { RouteAction } from "../types/types.js";
import { RoutesEnum } from "../enum/RoutesEnum.js";
import { json } from "node:stream/consumers";

function genHelloWorldAction(): RouteAction {
  return {
    method: "GET",
    apply: async (res) => {
      return new Promise((resolve) => {
        res.writeHead(200, { "Content-type": "test/plain" });
        res.end("Hello World!\n");
        resolve();
      });
    },
  };
}
function genLatestRatesAction(currencyClient: MockCurrencyClient): RouteAction {
  return {
    method: "GET",
    apply: async (res) => {
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

function genSlidwoCurrencyBotWebhookUpdates(): RouteAction {
  return {
    method: "POST",
    apply: async (res, req) => {
      return new Promise(async (resolve, reject) => {
        console.log("DEBUG: SlidwoCurrencyBotWebhookUpdates is working");
        console.log(`DEBUG: ${req?.headers["content-type"]}`);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ hello: "world" }));
      });
    },
  };
}

export const routeActionsMap: Map<string, RouteAction> = new Map([
  [RoutesEnum.HelloWorld, genHelloWorldAction()],
  [RoutesEnum.LatestRates, genLatestRatesAction(new MockCurrencyClient())],
  [
    RoutesEnum.SlidwoCurrencyBotWebhookUpdates,
    genSlidwoCurrencyBotWebhookUpdates(),
  ],
]);
