await myDataSource.query(
  `INSERT INTO users (email, nickname, password) VALUES (?,?,?)`,
  [email, nickname, hashedPw]
);
