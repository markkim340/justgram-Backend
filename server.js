// const dotenv = require("dotenv"); // 환경변수
// dotenv.config();
const http = require("http");
require("dotenv").config();

const { createApp } = require("./app");

const startServer = () => {
  const app = createApp();
  const port = 8000;
  const server = http.createServer(app);

  app.get("/", (req, res) => {
    res.status(200).json({ message: "pong!!" }); // 핑퐁테스트
  });
  app.listen(port, () => {
    console.log(`Listening on Port ${port}`);
  });
};

startServer();
