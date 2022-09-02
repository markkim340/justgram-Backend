const dotenv = require("dotenv"); // 환경변수
dotenv.config();
const http = require("http");
const express = require("express");
const app = express();
const router = require("./routers");

app.use(express.json());
app.use(router);

const startServer = () => {
  const app = createApp();
  const port = 8000;
  const server = http.createServer(app);

const server = http.createServer(app);

app.listen(8000, () => {
  console.log(`포트 8000에서 서버가 동작중입니다...`);
});