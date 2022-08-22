const { userService } = require("../services.userService");

const createUser = async (req, res) => {
  const { email, nickname, password } = req.body;
  if (!email || !nickname || !password) {
    res.status(400).json({ message: "입력된 값이 없는 항목이 있습니다." });
    return;
  }
  await userService.createUser(email, nickname, password);

  res.status(201).json({ message: "회원가입이 완료되었습니다." });
};

module.exports = { creatUser };
