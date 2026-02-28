import { MockCurrencyClient } from "../clients/MockCurrencyClient.js";
import type { RouteAction } from "../types/types.js";
import { RoutesEnum } from "../enum/RoutesEnum.js";

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
        if (!req) {
          res.writeHead(400);
          res.end("Bad Request");
          reject();
        } else {
          req.setEncoding("utf8");
          //TODO Create service or utils class for reading req.body ...
          req.on("data", () => {});
          resolve();
        }
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
