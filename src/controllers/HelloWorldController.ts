import type { RouteAction } from "../types/types.js";

export class HelloWorldController {
  constructor() {}

  getHelloWorldRouteAction(): RouteAction {
    return {
      method: "GET",
      execute: async (req, res) => {
        return new Promise((resolve) => {
          res.writeHead(200, { "Content-type": "test/plain" });
          res.end("Hello World!\n");
          resolve();
        });
      },
    };
  }
}
