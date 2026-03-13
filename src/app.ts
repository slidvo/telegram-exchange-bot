import http, { Server } from "node:http";
import { Router } from "./router/Router.js";
import { SlidwoCurrencyBotController } from "./controllers/SlidwoCurrencyBotController.js";
import DefaultBodyReaderService from "./services/impl/DefaultBodyReaderService.js";
import RoutesActionsProvider from "./providers/RoutesActionsProvider.js";
import { HelloWorldController } from "./controllers/HelloWorldController.js";
import { SlidwoCurrencyBotService } from "./services/impl/SlidwoCurrencyBotService.js";
import { SlidwoCurrencyBotCommandHandlerService } from "./services/impl/SlidwoCurrencyBotCommandHandlerService.js";
import { CommandsActionsProvider } from "./providers/CommandsActionsProvider.js";
import { SlidwoCurrencyBotCommandsService } from "./services/impl/SlidwoCurrencyBotCommandsService.js";
import SlidwoCurrencyBotClient from "./clients/impl/SlidwoCurrencyBotClient.js";
import { DefaultEnvironmentService } from "./services/impl/DefaultEnvironmentService.js";
import { DefaultCurrencyPairHandlerService } from "./services/impl/DefaultCurrencyPairHandlerService.js";
import { FrankfurterCurrencyExchangeRatesService } from "./services/impl/FrankfurterCurrencyExchangeRatesService.js";
import { FrankfurterExchangeRatesClient } from "./clients/impl/FrankfurterExchangeRatesApiClient.js";
import log from "./utils/logger.js";
/**
 * https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams
 */

class App {
  constructor(private router?: Router) {}

  startMyServer() {
    this.getMyServer().listen(3000, () => {
      log.DEBUG("Server running on port 3000");
    });
  }

  private getMyServer(): Server {
    return http.createServer(async (req, res) => {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
      const url = new URL(req.url!, "http://localhost");
      if (!this.router) {
        this.router = App.defaultRouter();
      }
      await this.router.handleRoute(req, res, url);
    });
  }

  private static defaultRouter(): Router {
    const helloWorldController = new HelloWorldController();
    const bodyReaderService = new DefaultBodyReaderService();
    const envService = new DefaultEnvironmentService();
    const telegramBotClient = new SlidwoCurrencyBotClient(
      envService,
      bodyReaderService,
    );
    const commandsService = new SlidwoCurrencyBotCommandsService(
      telegramBotClient,
    );
    const commandsActionProvider = new CommandsActionsProvider(commandsService);
    const commandsHandler = new SlidwoCurrencyBotCommandHandlerService(
      commandsActionProvider,
      telegramBotClient,
    );
    const frankfurterExchangeRatesClient = new FrankfurterExchangeRatesClient(
      bodyReaderService,
    );
    const currencyExchangeRatesService =
      new FrankfurterCurrencyExchangeRatesService(
        frankfurterExchangeRatesClient,
      );

    const currencyPairHandlerService = new DefaultCurrencyPairHandlerService(
      telegramBotClient,
      currencyExchangeRatesService,
    );
    const currencyBotService = new SlidwoCurrencyBotService(
      commandsHandler,
      currencyPairHandlerService,
    );
    const currencyBotController = new SlidwoCurrencyBotController(
      currencyBotService,
      bodyReaderService,
    );
    const actionsProvider = new RoutesActionsProvider(
      currencyBotController,
      helloWorldController,
    );
    return new Router(actionsProvider);
  }
}

new App().startMyServer();
