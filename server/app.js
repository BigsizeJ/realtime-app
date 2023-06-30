const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const socketHandler = require("./socket");

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
  },
});

app.use(express.json());
app.use(cors());

socketHandler(io);

app.get("/", (req, res) => res.send("Hello world"));

server.listen(3000, (err) => {
  if (err) console.error(err);
  console.log("Server running at http://localhost:3000");
});
