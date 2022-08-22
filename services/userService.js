const creatUser = (email, nickname, password) => {
  const hashedPw = bcrypt.hashSync(password);
};

module.exports = { creatUser };
