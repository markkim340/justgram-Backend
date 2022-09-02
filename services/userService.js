const userDao = require("../models/userDao");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async (email, nickname, password) => {
  if (!email.includes("@")) {
    const err = new Error("Email_Invalid");
    err.statusCode = 403;
    throw err;
  }
  if (password.length <= 4) {
    const err = new Error("password_Invailid");
    err.statusCode = 403;
    throw err;
  }
  const hashedPw = bcrypt.hashSync(password);
  const user = await userDao.createUser(email, nickname, hashedPw);
  return user;
};

const loginUser = async (email, password) => {
  const loginUser = await userDao.loginUser(email); // 1. userDao에 email을 인자로 보내어 email과 일치하는 항목을 셀렉으로 가져온다
  const checkPw = bcrypt.compareSync(password, loginUser[0].password); //  2. 셀렉으로 가져온 항목의 해쉬된 암호와 입력된 암호의 일치여부 확인
  if (checkPw) {
    const token = jwt.sign({ userId: loginUser[0].id }, "secreKey");
    return token;
  } else {
    const err = new Error("Invalid User!!!!!!!!");
    err.statusCode = 403;
    throw err;
  }
};

module.exports = { createUser, loginUser };
