import http, { Server } from "node:http";
import type { CurrencyClient } from "./clients/CurrencyClient.js";
import { MockCurrencyClient } from "./clients/MockCurrencyClient.js";
/**
 * https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams
 */

class MyServer {
  constructor(private currencyClient: CurrencyClient) {}

  private getMyServer(): Server {
    return http.createServer(async (req, res) => {
      const url = new URL(req.url!, "http://localhost");
      if (
        url.pathname === "/metalamp-study/telegram-exchange-bot/hello-world" &&
        req.method === "GET"
      ) {
        res.writeHead(200, { "Content-type": "test/plain" });
        res.end("Hello World!\n");
      } else if (
        url.pathname === "/metalamp-study/telegram-exchange-bot/latest/rates" &&
        req.method === "GET"
      ) {
        const params = url.searchParams;
        const base = params.get("base");
        console.log(`DEBUG: base = ${base}`);
        const response = await this.currencyClient.getLatestRates(
          base ?? undefined,
        );
        console.log(`DEBUG: response ${JSON.stringify(response)}`);
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify(response));
      } else {
        res.writeHead(404);
        res.end("Not found");
      }
    });
  }

  startMyServer() {
    this.getMyServer().listen(3000, () => {
      console.log("Server running on port 3000");
    });
  }
}

const myServer = new MyServer(new MockCurrencyClient());

myServer.startMyServer();
