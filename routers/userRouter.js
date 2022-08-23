const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/signup", userController.createUser); // 회원가입
router.post("/login", userController.loginUser); // 로그인

module.exports = router;
