import type RequestBody from "../model/RequestBody.js";
import type { RequestBodyService } from "../services/RequestBodyService.js";
import type { RouteAction } from "../types/types.js";

export class SlidwoCurrencyBotController {
  constructor(private requestBodyService: RequestBodyService) {}

  genSlidwoCurrencyBotWebhookUpdates(): RouteAction {
    return {
      method: "POST",
      apply: async (res, req) => {
        let data: RequestBody | any;
        try {
          console.log("DEBUG: SlidwoCurrencyBotWebhookUpdates is working");
          data = await this.requestBodyService.readRequestBody(req!);
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
}
