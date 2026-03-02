import type { SlidwoCurrencyBotController } from "../controllers/SlidwoCurrencyBotController.js";
import { RoutesEnum } from "../enum/RoutesEnum.js";
import type { RouteAction } from "../types/types.js";
import type { RouteActionsProvider } from "./RouteActionProvider.js";

export class SlidwoCurrencyBotActionsProvider implements RouteActionsProvider {
  //TODO ADD CurrencyClient
  constructor(
    private slidwoCurrencyBotController: SlidwoCurrencyBotController,
  ) {}
  getActionsMap(): Map<string, RouteAction> {
    return new Map([
      [
        RoutesEnum.SlidwoCurrencyBotWebhookUpdates,
        this.slidwoCurrencyBotController.genSlidwoCurrencyBotWebhookUpdates(),
      ],
    ]);
  }
}
