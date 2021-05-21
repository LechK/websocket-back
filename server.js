const express = require("express");
const app = express();
const server = require("http").createServer(app);
const WebSocket = require("ws");

const wss = new WebSocket.Server(
  { server: server },
  {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["Access-Control-Allow-Origin"],
      credentials: true,
    },
  },
);

wss.on("connection", function connection(socket) {
  console.log("[Server] A client was connected");
  socket.send("Welcome New Client!");

  socket.on("message", function incoming(message) {
    console.log("received:", message);
    wss.broadcast(message);
  });
});

wss.broadcast = function broadcast(message) {
  console.log(message);
  wss.clients.forEach(function each(client) {
    switch (message) {
      case "swipeLeft": {
        return client.send(
          JSON.stringify({
            objName: "dynamicGesture",
            handID: "4",
            gesture: "Swipe Left",
          }),
        );
      }
      case "swipeRight": {
        return client.send(
          JSON.stringify({
            objName: "dynamicGesture",
            handID: "7",
            gesture: "Swipe Right",
          }),
        );
      }
      case "swipeUp": {
        return client.send(
          JSON.stringify({
            objName: "dynamicGesture",
            handID: "7",
            gesture: "Swipe Up",
          }),
        );
      }
      case "swipeDown": {
        return client.send(
          JSON.stringify({
            objName: "dynamicGesture",
            handID: "7",
            gesture: "Swipe Down",
          }),
        );
      }
      case "zoomIn": {
        return client.send(
          JSON.stringify({
            objName: "staticGesture",
            handID: "27",
            gesture: "Zoom",
            orientation: "In",
            handSide: "Unknown",
            handFace: "Front",
          }),
        );
      }
      case "zoomOut": {
        return client.send(
          JSON.stringify({
            objName: "staticGesture",
            handID: "31",
            gesture: "Zoom",
            orientation: "Out",
            handSide: "Unknown",
            handFace: "Right",
          }),
        );
      }
      case "pointingUp": {
        return client.send(
          JSON.stringify({
            objName: "staticGesture",
            handID: "37",
            gesture: "Pointing",
            orientation: "Up",
            handSide: "Right",
            handFace: "Front",
          }),
        );
      }
      case "pointingDown": {
        return client.send(
          JSON.stringify({
            objName: "staticGesture",
            handID: "41",
            gesture: "Pointing",
            orientation: "Down",
            handSide: "Right",
            handFace: "Front",
          }),
        );
      }
      case "fist": {
        return client.send(
          JSON.stringify({
            objName: "staticGesture",
            handID: "43",
            gesture: "Fist",
            orientation: "Unknown",
            handSide: "Unknown",
            handFace: "Unknown",
          }),
        );
      }
      case "victory": {
        return client.send(
          JSON.stringify({
            objName: "staticGesture",
            handID: "53",
            gesture: "Victory",
            orientation: "Unknown",
            handSide: "Right",
            handFace: "Front",
          }),
        );
      }
      case "poi": {
        return client.send(
          JSON.stringify({
            popup: "poi",
          }),
        );
      }
      case "incomingCall": {
        return client.send(
          JSON.stringify({
            popup: "incomingCall",
          }),
        );
      }
      default: {
        client.send("Waiting for gesture!");
      }
    }
  });
};

//port picked as default, 4000
server.listen(8080, () => console.log("Server running on port 8080"));
