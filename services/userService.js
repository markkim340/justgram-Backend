const userDao = require("../models/userDao");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async (email, nickname, password) => {
  console.log("MK Service 1");
  const hashedPw = bcrypt.hashSync(password);
  const user = await userDao.createUser(email, nickname, hashedPw);
  console.log("MK Controller 2");
  return user;
};

module.exports = { createUser };
