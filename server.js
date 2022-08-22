const dotenv = require("dotenv"); // 환경변수
dotenv.config();
const express = require("express");
const userController = require("./controllers/userController");
const postController = require("./controllers/postController");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "pong!!" }); // 핑퐁테스트
});

app.post("/signup", userController.createUser); // 회원가입
app.get("/posts", postController.getPostings); // 게시글 조회
app.get("/userPosts", postController.getPostingsById); // 유저별 게시글 조회
app.post("/post", postController.createPostings); // 게시글 등록
app.patch("/posts", postController.updatePostings); // 게시글 수정
app.delete("/posts", postController.deletePostings); // 게시글 삭제

///////////    로그인     /////////////
app.post("/signin", async (req, res) => {
  let { email, password } = req.body; ///    controller
  await myDataSource.query(
    `SELECT users.id, users.email, users.password FROM users WHERE users.email= "${email}"`,
    (err, row) => {
      if (err) {
        console.log(err);
        res.json({ message: "Error" });
      } else if (row[0].email !== email) {
        res.json({ message: "아이디를 다시 확인하시길 바랍니다." });
      } else {
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
    }
  );
});

app.listen(8000, () => {
  console.log(`포트 8000에서 서버가 동작중입니다...`);
});
