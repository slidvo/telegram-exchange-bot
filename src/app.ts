import http, { Server } from "node:http";
import { Router } from "./router/Router.js";
import { SlidwoCurrencyBotController } from "./controllers/SlidwoCurrencyBotController.js";
import DefaultRequestBodyService from "./services/impl/DefaultRequestBodyService.js";
import DefaultActionsProvider from "./providers/DefaultActionsProvider.js";
import { MockCurrencyClient } from "./clients/MockCurrencyClient.js";
import { HelloWorldController } from "./controllers/HelloWorldController.js";
/**
 * https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams
 */

class App {
  constructor(private router: Router) {}

  private getMyServer(): Server {
    return http.createServer(async (req, res) => {
      const url = new URL(req.url!, "http://localhost");
      await this.router.handleRoute(req, res, url);
    });
  }

  startMyServer() {
    this.getMyServer().listen(3000, () => {
      console.log("Server running on port 3000");
    });
  }
}

const myServer = new App(
  new Router(
    new DefaultActionsProvider(
      new SlidwoCurrencyBotController(
        new DefaultRequestBodyService(),
        new MockCurrencyClient(),
      ),
      new HelloWorldController(),
    ),
  ),
);
myServer.startMyServer();
