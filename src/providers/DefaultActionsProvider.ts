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

  getActionsMap<T>(): Map<string, T> {
    return new Map<string, T>([
      [
        RoutesEnum.SlidwoCurrencyBotWebhookUpdates,
        this.slidwoCurrencyBotController.getWebhookUpdatesRouteAction() as T,
      ],
      [
        RoutesEnum.HelloWorld,
        this.helloWorldController.getHelloWorldRouteAction() as T,
      ],
    ]);
  }
}
