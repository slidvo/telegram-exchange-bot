import { MockCurrencyClient } from "../clients/MockCurrencyClient.js";
import type { RouteAction } from "../types/types.js";
import { RoutesEnum } from "../enum/RoutesEnum.js";
import DefaultRequestBodyService from "../services/DefaultRequestBodyService.js";
import type RequestBody from "../model/RequestBody.js";

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

function genSlidwoCurrencyBotWebhookUpdates(
  requsetBodyService: DefaultRequestBodyService,
): RouteAction {
  return {
    method: "POST",
    apply: async (res, req) => {
      let data: RequestBody | any;
      try {
        console.log("DEBUG: SlidwoCurrencyBotWebhookUpdates is working");
        data = await requsetBodyService.readRequestBody(req!);
        console.log(data);
        res.statusCode = 200;
      } catch (error) {
        res.statusCode = 500;
        data = { httpCode: "500", message: "Internal server error" };
      } finally {
        res.end(JSON.stringify(data));
      }
    },
  };
}

export const routeActionsMap: Map<string, RouteAction> = new Map([
  [RoutesEnum.HelloWorld, genHelloWorldAction()],
  [RoutesEnum.LatestRates, genLatestRatesAction(new MockCurrencyClient())],
  [
    RoutesEnum.SlidwoCurrencyBotWebhookUpdates,
    genSlidwoCurrencyBotWebhookUpdates(new DefaultRequestBodyService()),
  ],
]);
