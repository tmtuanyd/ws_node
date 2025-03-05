import { WebSocketServer } from "ws";
import http from "http";

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/plain",
    "Access-Control-Allow-Origin": "*", // Allow all origins
  });
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
  "admin",
];

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.send(
    '{"page": "hatch_opened","message": "<message>", "event": "page_change"}'
  );

  while (i < test.length) {
    ws.send(
      `{"page": "${test[i]}","message": "<message>", "event": "page_change"}`
    );
    i++;
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
