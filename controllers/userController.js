const userService = require("../services/userService");

const createUser = async (req, res) => {
  try {
    const { email, nickname, password } = req.body;
    if (!email || !nickname || !password) {
      res.status(400).json({ message: "Key_Error" });
      return;
    }
    await userService.createUser(email, nickname, password);
    res.status(201).json({ message: "User_Created!!!" });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!password) {
      throw new Error("Key_Error...");
    }
    const loginUser = await userService.loginUser(email, password);
    res
      .status(200)
      .json({ message: "로그인이 완료되었습니다.", token: loginUser });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = { createUser, loginUser };
