const express = require("express");
const cors = require("cors");
const router = require("./routers");

const createApp = () => {
  const app = express();

  app.use(express.json);
  app.use(cors());
  app.use(router);

  return app;
};

module.exports = { createApp };
