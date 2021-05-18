const app = require("express")();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Access-Control-Allow-Origin"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("dynamicGesture", ({ objName, handID, gesture }) => {
    io.emit("dynamicGesture", console.log({ objName, handID, gesture }));
  });
  socket.on("staticGesture", ({ objName, handID, gesture, orientation, handSide, handFace }) => {
    io.emit(
      "staticGesture",
      console.log({ objName, handID, gesture, orientation, handSide, handFace }),
    );
  });
});

httpServer.listen(4000, () => {
  console.log("server running on port 4000");
});
