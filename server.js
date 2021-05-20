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
    //based on request value, we send them response as object
    switch (message) {
      case "swipeLeft": {
        return socket.send(
          JSON.stringify({
            objName: "dynamicGesture",
            handID: "4",
            gesture: "Swipe Left",
          }),
        );
      }
      case "swipeRight": {
        return socket.send(
          JSON.stringify({
            objName: "dynamicGesture",
            handID: "7",
            gesture: "Swipe Right",
          }),
        );
      }
      case "swipeUp": {
        return socket.send(
          JSON.stringify({
            objName: "dynamicGesture",
            handID: "7",
            gesture: "Swipe Up",
          }),
        );
      }
      case "swipeDown": {
        return socket.send(
          JSON.stringify({
            objName: "dynamicGesture",
            handID: "7",
            gesture: "Swipe Down",
          }),
        );
      }
      case "zoomIn": {
        return socket.send(
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
        return socket.send(
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
        return socket.send(
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
        return socket.send(
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
        return socket.send(
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
        return socket.send(
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
      default: {
        socket.send("Waiting for gesture!");
      }
    }
  });
});

//port picked as default, 4000
server.listen(8080, () => console.log("Server running on port 8080"));
