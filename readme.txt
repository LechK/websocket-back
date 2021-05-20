HOW TO RUN BACKEND: 
  1. Clone master branch
  2. Run "npm i" command to install all dependencies
  3. "npm run dev" to launch server at localhost:4000


Testing from frontend:

(EXAMPLES DONE IN REACT)

First, we estabilish connection, make sure to include extraHeaders with Access Control settings: 

        const socket = io.connect("http://localhost:4000", {
          withCredentials: true,
          extraHeaders: {
            "Access-Control-Allow-Origin": "*",
          },
        });

Get response from server, if we are really connected: 

        useEffect(() => {
          socket.on("connect", () => {
             setConnected(socket.connected);
          });
        }, []);

We send request with onClick event, and get response based on sent value: 

        <Button
          color="primary"
          handleClick={() => {
            socket.emit("gesture", { value: "zoomIn" });
          }}
        >
          Swipe Left
        </Button>

Response we get:

        Object { 
          objName: "staticGesture", 
          handID: "27", 
          gesture: "Zoom", 
          orientation: "In", 
          handSide: "Unknown", 
          handFace: "Front" 
        }

    