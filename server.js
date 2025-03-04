import { WebSocketServer } from "ws";
import http from "http";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("WebSocket server is running!");
});

const wss = new WebSocketServer({ server });

const test = [
  "init",
  "idle",
  "hatch_opened",
  "inserted",
  "error",
  "maintainance",
];

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.send(
    '{"page": "hatch_opened","message": "<message>", "event": "page_change"}'
  );
  setInterval(async () => {
    const randomTestValue = test[Math.floor(Math.random() * test.length)];
    ws.send(
      `{"page": "${randomTestValue}","message": "This is error message", "event": "page_change"}`
    );
  }, 5000);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
