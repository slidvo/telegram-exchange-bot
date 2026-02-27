import { MockCurrencyClient } from "../clients/MockCurrencyClient.js";
import type { RouteAction } from "../types/types.js";

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

export const routeActionsMap: Map<string, RouteAction> = new Map([
  ["/metalamp-study/telegram-exchange-bot/hello-world", genHelloWorldAction()],
  [
    "/metalamp-study/telegram-exchange-bot/latest/rates",
    genLatestRatesAction(new MockCurrencyClient()),
  ],
]);
