import http from "node:http";

const server = http.createServer((req, res) => {
  if (
    req.url === "/metalamp-study/telegram-exchange-bot/hello-world" &&
    req.method === "GET"
  ) {
    res.writeHead(200, { "Content-type": "test/plain" });
    res.end("Hello World!\n");
  } else {
    res.writeHead(404);
    res.end("Not found");
  }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
