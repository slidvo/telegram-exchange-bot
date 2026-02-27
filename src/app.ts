import http, { Server } from "node:http";
import { Router } from "./router/Router.js";
/**
 * https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams
 */

class MyServer {
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

const myServer = new MyServer(new Router());
myServer.startMyServer();
