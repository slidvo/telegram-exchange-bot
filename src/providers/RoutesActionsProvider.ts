import type { HelloWorldController } from "../controllers/HelloWorldController.js";
import type { SlidwoCurrencyBotController } from "../controllers/SlidwoCurrencyBotController.js";
import { RouteEnum } from "../enums/RouteEnum.js";
import type { ActionsProvider } from "./ActionsProvider.js";

export default class DefaultActionsProvider implements ActionsProvider {
  constructor(
    private slidwoCurrencyBotController: SlidwoCurrencyBotController,
    private helloWorldController: HelloWorldController,
  ) {}

  getActionsMap<T>(): Map<string, T> {
    return new Map<string, T>([
      [
        RouteEnum.SlidwoCurrencyBotWebhookUpdates,
        this.slidwoCurrencyBotController.getWebhookUpdatesRouteAction() as T,
      ],
      [
        RouteEnum.HelloWorld,
        this.helloWorldController.getHelloWorldRouteAction() as T,
      ],
    ]);
  }
}
