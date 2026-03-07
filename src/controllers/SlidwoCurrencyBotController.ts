import type { Update } from "../dto/Update.js";
import type { CurrencyBotService } from "../services/CurrencyBotService.js";
import type { RequestBodyService } from "../services/RequestBodyService.js";
import type { RouteAction } from "../types/types.js";

export class SlidwoCurrencyBotController {
  constructor(
    private currencyBotService: CurrencyBotService,
    private requestBodyService: RequestBodyService,
  ) {}

  getWebhookUpdatesRouteAction(): RouteAction {
    return {
      method: "POST",
      apply: async (req: any, res: any) => {
        let data:
          | Update
          | { httpCode: string; message: string }
          | { status: string };
        try {
          //TODO Create LoggerService
          console.log("DEBUG: SlidwoCurrencyBotWebhookUpdates is working");
          const update =
            await this.requestBodyService.readRequestBody<Update>(req);
          await this.currencyBotService.processUpdate(update);
          res.statusCode = 200;
          res.end(JSON.stringify({ status: "ok" }));
        } catch (error) {
          res.statusCode = 500;
          data = { httpCode: "500", message: "Internal server error" };
          res.end(JSON.stringify(data));
        }
      },
    };
  }
}
