import type { HelloWorldController } from "../controllers/HelloWorldController.js";
import type { SlidwoCurrencyBotController } from "../controllers/SlidwoCurrencyBotController.js";
import { RoutesEnum } from "../enums/RoutesEnum.js";
import type { RouteAction } from "../types/types.js";
import type { ActionsProvider } from "./ActionsProvider.js";

export default class DefaultActionsProvider implements ActionsProvider {
  constructor(
    private slidwoCurrencyBotController: SlidwoCurrencyBotController,
    private helloWorldController: HelloWorldController,
  ) {}

  getRouteActionsMap(): Map<string, RouteAction> {
    return new Map<string, RouteAction>([
      [
        RoutesEnum.SlidwoCurrencyBotWebhookUpdates,
        this.slidwoCurrencyBotController.getWebhookUpdatesRouteAction(),
      ],
      [
        RoutesEnum.HelloWorld,
        this.helloWorldController.getHelloWorldRouteAction(),
      ],
    ]);
  }
}
