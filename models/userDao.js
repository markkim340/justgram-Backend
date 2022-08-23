const { DataSource } = require("typeorm");
const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!!!!!!");
  })
  .catch(() => {
    console.log("Database initiate fail");
  });

const createUser = async (email, nickname, hashedPw) => {
  const user = await myDataSource.query(
    `INSERT INTO users (email, nickname, password) VALUES (?,?,?)`,
    [email, nickname, hashedPw]
  );
  return user;
};

const loginUser = async (email) => {
  const loginUser = await myDataSource.query(
    `SELECT users.id, users.email, users.password FROM users WHERE users.email= "${email}"`
  );
  return loginUser;
};

module.exports = { createUser, loginUser };
