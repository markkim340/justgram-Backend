// const dotenv = require("dotenv"); // 환경변수
// dotenv.config();
require("dotenv").config();

const { createApp } = require("./app");

const startServer = () => {
  const app = createApp();
  const port = 8000;

  app.get("/", (req, res) => {
    res.status(200).json({ message: "pong!!" }); // 핑퐁테스트
  });

  app.listen(8000, () => {
    console.log(`Listening on Port 8000`);
  });
};

startServer();
