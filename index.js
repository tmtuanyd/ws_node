import { WebSocketServer } from "ws";
import si from "systeminformation";

const wss = new WebSocketServer({ port: 8080 });

const test = [
  "init",
  "idle",
  "hatch_opened",
  "inserted",
  "error",
  "maintainance",
];

wss.on("connection", function connection(ws) {
  //   ws.on("page_change", function message(data) {
  //     console.log("received: %s", data);
  //   });

  ws.send(
    '{"page": "hatch_opened","message": "<message>", "event": "page_change"}'
  );
  setInterval(async () => {
    const randomTestValue = test[Math.floor(Math.random() * test.length)];
    ws.send(
      `{"page": "${randomTestValue}","message": "This is error message", "event": "page_change"}`
    );
  }, 10000);
});
