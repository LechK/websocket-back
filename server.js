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

// const io = require("socket.io")(httpServer, {
//   //sometimes cors doesn't allow for us to make request from client-side, so those rules are NEEDED
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//     allowedHeaders: ["Access-Control-Allow-Origin"],
//     credentials: true,
//   },
// });

wss.on("connection", (ws) => {
  console.log("[Server] A client was connected");
  ws.send("Welcome Dmitrii!");

  //CLOSE NOT WORKING!! YET!!
  wss.on("close", (ws) => {
    console.log("[Server] Client Disconnected.");
    ws.send("Ending this session!");
  });

  ws.on("gesture", ({ value }) => {
    //based on request value, we send them response as object
    switch (value) {
      case "swipeLeft": {
        return ws.emit("response", {
          objName: "dynamicGesture",
          handID: "4",
          gesture: "Swipe Left",
        });
      }
      case "swipeRight": {
        return ws.emit("response", {
          objName: "dynamicGesture",
          handID: "7",
          gesture: "Swipe Right",
        });
      }
      case "swipeUp": {
        return ws.emit("response", {
          objName: "dynamicGesture",
          handID: "11",
          gesture: "Swipe Up",
        });
      }
      case "swipeDown": {
        return ws.emit("response", {
          objName: "dynamicGesture",
          handID: "21",
          gesture: "Swipe Down",
        });
      }
      case "zoomIn": {
        return ws.emit("response", {
          objName: "staticGesture",
          handID: "27",
          gesture: "Zoom",
          orientation: "In",
          handSide: "Unknown",
          handFace: "Front",
        });
      }
      case "zoomOut": {
        return ws.emit("response", {
          objName: "staticGesture",
          handID: "31",
          gesture: "Zoom",
          orientation: "Out",
          handSide: "Unknown",
          handFace: "Right",
        });
      }
      case "pointingUp": {
        return ws.emit("response", {
          objName: "staticGesture",
          handID: "37",
          gesture: "Pointing",
          orientation: "Up",
          handSide: "Right",
          handFace: "Front",
        });
      }
      case "pointingDown": {
        return ws.emit("response", {
          objName: "staticGesture",
          handID: "41",
          gesture: "Pointing",
          orientation: "Down",
          handSide: "Right",
          handFace: "Front",
        });
      }
      case "fist": {
        return ws.emit("response", {
          objName: "staticGesture",
          handID: "43",
          gesture: "Fist",
          orientation: "Unknown",
          handSide: "Unknown",
          handFace: "Unknown",
        });
      }
      case "victory": {
        return ws.emit("response", {
          objName: "staticGesture",
          handID: "53",
          gesture: "Victory",
          orientation: "Unknown",
          handSide: "Right",
          handFace: "Front",
        });
      }
      default: {
        ws.emit("response", {
          msg: "Waiting for gesture!",
        });
      }
    }
  });
});

//port picked as default, 4000
server.listen(8080, () => console.log("Server running on port 8080"));
