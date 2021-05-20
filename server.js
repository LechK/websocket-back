const app = require("express")();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  //sometimes cors doesn't allow for us to make request from client-side, so those rules are NEEDED
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Access-Control-Allow-Origin"],
    credentials: true,
  },
});

//connection
io.on("connection", (socket) => {
  console.log("[Server] A client was connected");

  //CLOSE NOT WORKING!! YET!!
  io.on("close", () => console.log("[Server] Client Disconnected."));

  socket.on("gesture", ({ value }) => {
    //based on request value, we send them response as object
    switch (value) {
      case "swipeLeft": {
        return io.emit("response", {
          objName: "dynamicGesture",
          handID: "4",
          gesture: "Swipe Left",
        });
      }
      case "swipeRight": {
        return io.emit("response", {
          objName: "dynamicGesture",
          handID: "7",
          gesture: "Swipe Right",
        });
      }
      case "swipeUp": {
        return io.emit("response", {
          objName: "dynamicGesture",
          handID: "11",
          gesture: "Swipe Up",
        });
      }
      case "swipeDown": {
        return io.emit("response", {
          objName: "dynamicGesture",
          handID: "21",
          gesture: "Swipe Down",
        });
      }
      case "zoomIn": {
        return io.emit("response", {
          objName: "staticGesture",
          handID: "27",
          gesture: "Zoom",
          orientation: "In",
          handSide: "Unknown",
          handFace: "Front",
        });
      }
      case "zoomOut": {
        return io.emit("response", {
          objName: "staticGesture",
          handID: "31",
          gesture: "Zoom",
          orientation: "Out",
          handSide: "Unknown",
          handFace: "Right",
        });
      }
      case "pointingUp": {
        return io.emit("response", {
          objName: "staticGesture",
          handID: "37",
          gesture: "Pointing",
          orientation: "Up",
          handSide: "Right",
          handFace: "Front",
        });
      }
      case "pointingDown": {
        return io.emit("response", {
          objName: "staticGesture",
          handID: "41",
          gesture: "Pointing",
          orientation: "Down",
          handSide: "Right",
          handFace: "Front",
        });
      }
      case "fist": {
        return io.emit("response", {
          objName: "staticGesture",
          handID: "43",
          gesture: "Fist",
          orientation: "Unknown",
          handSide: "Unknown",
          handFace: "Unknown",
        });
      }
      case "victory": {
        return io.emit("response", {
          objName: "staticGesture",
          handID: "53",
          gesture: "Victory",
          orientation: "Unknown",
          handSide: "Right",
          handFace: "Front",
        });
      }
      default: {
        io.emit("response", {
          msg: "Waiting for gesture!",
        });
      }
    }
  });
});

//port picked as default, 4000
httpServer.listen(4000, () => {
  console.log("Server running on port 4000");
});
