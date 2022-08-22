const dotenv = require("dotenv"); // 환경변수 선언으로 맨 위에 적어주는 것이 좋다...?
dotenv.config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userController = require("./controllers/userController");

const app = express();
app.use(express.json());

const { DataSource } = require("typeorm");
const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

myDataSource //데이타 베이스 불러오기
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!!!!!!");
  })
  .catch(() => {
    console.log("Database initiate fail");
  });

/// 핑퐁 테스트 ///
app.get("/", (req, res) => {
  res.status(200).json({ message: "pong!!" });
});

/////  회원가입   //////
app.post("/signup", async (req, res) => {
  // const { email, nickname, password } = req.body;
  // if (!email || !nickname || !password) {
  //   res.status(400).json({ message: "입력된 값이 없는 항목이 있습니다." });
  //   return;
  // }
  // const hashedPw = bcrypt.hashSync(password); // 비밀번호 암호화
  try {
    // await myDataSource.query(
    //   `INSERT INTO users (email, nickname, password) VALUES (?,?,?)`,
    //   [email, nickname, hashedPw]
    // );
    // res.status(201).json({ message: "회원가입이 완료되었습니다." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error" });
  }
});
///////////    로그인     /////////////
app.post("/signin", async (req, res) => {
  let { email, password } = req.body;
  let sql = `SELECT users.id, users.email, users.password FROM users WHERE users.email= "${email}"`;
  await myDataSource.query(sql, (err, row) => {
    if (err) {
      console.log(err);
      res.json({ message: "Error" });
    } else if (row[0].email !== email) {
      res.json({ message: "아이디를 다시 확인하시길 바랍니다." });
    } else {
      let DB_email = row[0].email; // db
      let DB_password = row[0].password; // db
      let checkPw = bcrypt.compareSync(password, DB_password); // 입력된 비밀번호와 해쉬된 비밀번호 일치여부확인 ////
      console.log(checkPw);
      if (checkPw) {
        const token = jwt.sign({ userId: row[0].id }, "secreKey");
        res.json({ message: "로그인이 완료되었습니다.", token: token });
      } else {
        res.json({ message: "패스워드를 다시 확인하시길 바랍니다." });
      }
    }
  });
});

/////    유저목록 조회하기   /////
app.get("/userList", async (req, res) => {
  try {
    await myDataSource.query(`SELECT * FROM users`, (err, rows) => {
      res.status(200).json(rows);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error" });
  }
});

//////   게시글 등록하기  ////////////
app.post("/post", async (req, res) => {
  const { user_id, contents } = req.body;
  try {
    await myDataSource.query(
      `INSERT INTO postings (user_id, contents) VALUES (?,?)`,
      [user_id, contents] // 데이타베이스에 입력될 항목을 입력
    );
    res.status(201).json({ message: "게시글이 작성되었습니다." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error" });
  }
});

/////// 게시글 조회하기 ///////
app.get("/posts", async (req, res) => {
  const postingData = await myDataSource.query(
    `
    SELECT 
      users.id as user_Id,
      users.profile_image as userProfileImage,
      postings.id as postingId,
      postings.contents as postingContent
    FROM postings
    JOIN users ON users.id = postings.user_id;
    `
  );
  res.status(200).json({ data: postingData });
});

/////// 유저별 게시글 조회하기 ///////
app.get("/userPosts", async (req, res) => {
  const postingData = await myDataSource.query(
    `
    SELECT 
      users.id as userId,
      users.nickname as username,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'postingId', postings.id,
          'postingContent', postings.contents
        )
      )as postings
    FROM justgram_study.postings
    JOIN justgram_study.users ON users.id = postings.user_id
    WHERE users.id = 3
    GROUP BY users.id
    `
  ); ///////////////////////////////// ARRAYAGG 는 GROUP BY 와 함께 사용한다???.
  res.status(200).json({ data: postingData });
});

/////// 게시글 수정하기 ///////
app.patch("/posts", async (req, res) => {
  const { id, contents } = req.body;
  // 게시물 수정//
  await myDataSource.query(
    `
  UPDATE
  postings
  SET
  contents = ?
  WHERE id = ?
  `,
    [contents, id]
  );
  //수정된 게시물 불러오기//
  const newPosts = await myDataSource.query(`
  SELECT 
    users.id as user_Id,
    users.profile_image as userProfileImage,
    postings.id as postingId,
    postings.contents as postingContent
  FROM postings
    JOIN users ON users.id = postings.user_id;
  `);
  res.status(200).json({ message: newPosts });
});

/////// 게시글 삭제하기 ///////
app.delete("/posts", async (req, res) => {
  const postId = req.query.id;
  try {
    await myDataSource.query(
      `
  DELETE
  FROM
    postings
  WHERE postings.id = ?
  `,
      [postId]
    );
    res.status(204).json({ message: "Delete Complete..." }); // 204status는 아무것도 안 나타낸다..
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Error" });
  }
});

//////  server 작동 /////
app.listen(8000, () => {
  console.log(`포트 ${port}에서 서버가 동작중입니다...`);
});
