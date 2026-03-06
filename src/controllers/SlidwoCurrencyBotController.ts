import type Update from "../dto/Update.js";
import type { RequestBodyService } from "../services/RequestBodyService.js";
import type { RouteAction } from "../types/types.js";

export class SlidwoCurrencyBotController {
  constructor(private requestBodyService: RequestBodyService) {}

  getWebhookUpdatesRouteAction(): RouteAction {
    return {
      method: "POST",
      apply: async (req: any, res: any) => {
        let data:
          | Update
          | { httpCode: string; message: string }
          | { status: string };
        try {
          console.log("DEBUG: SlidwoCurrencyBotWebhookUpdates is working");
          res.statusCode = 200;
          res.end(JSON.stringify({ status: "ok" }));
          this.requestBodyService.readRequestBody(req);
        } catch (error) {
          res.statusCode = 500;
          data = { httpCode: "500", message: "Internal server error" };
          res.end(JSON.stringify(data));
        }
      },
    };
  }
}
