const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/signup", userController.createUser); // 회원가입

router.post("/login", async (req, res) => {
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

module.exports = router;
