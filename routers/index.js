const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const postRouer = require("./postRouter");

router.use("/users", userRouter);
router.use("/postings", postRouer);

module.exports = router;
