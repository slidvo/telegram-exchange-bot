import http, { Server } from "node:http";
import { Router } from "./router/Router.js";
import { SlidwoCurrencyBotController } from "./controllers/SlidwoCurrencyBotController.js";
import DefaultRequestBodyService from "./services/impl/DefaultRequestBodyService.js";
import RoutesActionsProvider from "./providers/RoutesActionsProvider.js";
import { HelloWorldController } from "./controllers/HelloWorldController.js";
import { SlidwoCurrencyBotService } from "./services/impl/SlidwoCurrencyBotService.js";
import { SlidwoCurrencyBotCommandHandlerService } from "./services/impl/SlidwoCurrencyBotCommandHandlerService.js";
import { CommandsActionsProvider } from "./providers/CommandsActionsProvider.js";
import { SlidwoCurrencyBotCommandsService } from "./services/impl/SlidwoCurrencyBotCommandsService.js";
import SlidwoCurrencyBotClient from "./clients/impl/SlidwoCurrencyBotClient.js";
/**
 * https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams
 */

class App {
  constructor(private router?: Router) {}

  startMyServer() {
    this.getMyServer().listen(3000, () => {
      console.log("Server running on port 3000");
    });
  }

  private getMyServer(): Server {
    return http.createServer(async (req, res) => {
      const url = new URL(req.url!, "http://localhost");
      if (!this.router) {
        this.router = App.defaultRouter();
      }
      await this.router.handleRoute(req, res, url);
    });
  }

  private static defaultRouter(): Router {
    const helloWorldController = new HelloWorldController();
    const requsetBodyService = new DefaultRequestBodyService();
    const telegramBotClient = new SlidwoCurrencyBotClient();
    const commandsService = new SlidwoCurrencyBotCommandsService(
      telegramBotClient,
    );
    const commandsActionProvider = new CommandsActionsProvider(commandsService);
    const commandsHandler = new SlidwoCurrencyBotCommandHandlerService(
      commandsActionProvider,
    );
    const currencyBotService = new SlidwoCurrencyBotService(commandsHandler);
    const currencyBotController = new SlidwoCurrencyBotController(
      currencyBotService,
      requsetBodyService,
    );
    const actionsProvider = new RoutesActionsProvider(
      currencyBotController,
      helloWorldController,
    );
    return new Router(actionsProvider);
  }
}

new App().startMyServer();
