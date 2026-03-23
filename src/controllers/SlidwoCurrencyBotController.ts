import type { Update } from "../dto/Update.js";
import type { CurrencyBotService } from "../services/CurrencyBotService.js";
import type { BodyReaderService } from "../services/BodyReaderService.js";
import type { RouteAction } from "../types/types.js";
import log from "../utils/logger.js";

export class SlidwoCurrencyBotController {
  constructor(
    private currencyBotService: CurrencyBotService,
    private bodyReaderService: BodyReaderService,
  ) {}

  getWebhookUpdatesRouteAction(): RouteAction {
    return {
      method: "POST",
      execute: async (req: any, res: any) => {
        let errMsg = "";
        let data: Update | { httpCode: string; message: string };

        try {
          log.DEBUG(`getWebhookUpdatesRouteAction.execute is working`);
          const update = await this.bodyReaderService.readBody(req);
          if (!this.isUpdate(update)) {
            errMsg += `От телеграм бота пришло сообщение в неверном формате\n${update}`;
            throw new Error(errMsg);
          }
          await this.currencyBotService.processUpdate(update);
          res.statusCode = 200;
          res.end(JSON.stringify({ status: "ok" }));
        } catch (error) {
          res.statusCode = 500;
          data = {
            httpCode: "500",
            message: `Internal server error\n${errMsg}`,
          };
          res.end(JSON.stringify(data));
        }
      },
    };
  }

  private isUpdate(obj: any): obj is Update {
    //TODO
    return (
      typeof obj === "object" &&
      obj !== null &&
      typeof obj.update_id === "number" &&
      typeof obj.message === "object"
    );
  }
}
