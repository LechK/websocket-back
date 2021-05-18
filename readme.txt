commands: "dynamicGesture" , "staticGesture"

EXAMPLE: "dynamicGesture"

        handleClick={() => {
          const { objName, handID, gesture } = {
            objName: "dynamicGesture",
            handID: 54,
            gesture: "Swipe Down",
          };
          socket.emit("dynamicGesture", { objName, handID, gesture });
        }}


EXAMPLE: "staticGesture"

        handleClick={() => {
          const { objName, handID, gesture, orientation, handSide, handFace } =
            {
              objName: "staticGesture",
              handID: 25,
              gesture: "Zoom",
              orientation: "In",
              handSide: "Unknown",
              handFace: "Unknown",
            };
          socket.emit("staticGesture", {
            objName,
            handID,
            gesture,
            orientation,
            handSide,
            handFace,
          });
        }}