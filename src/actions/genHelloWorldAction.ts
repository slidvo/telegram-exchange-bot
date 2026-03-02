import type { RouteAction } from "../types/types.js";

export function genHelloWorldAction(): RouteAction {
  return {
    method: "GET",
    apply: async (res) => {
      return new Promise((resolve) => {
        res.writeHead(200, { "Content-type": "test/plain" });
        res.end("Hello World!\n");
        resolve();
      });
    },
  };
}
