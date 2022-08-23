const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.get("", postController.getPostings); // 게시글 조회
router.get("/userPosts", postController.getPostingsById); // 유저별 게시글 조회
router.post("", postController.createPostings); // 게시글 등록
router.patch("", postController.updatePostings); // 게시글 수정
router.delete("", postController.deletePostings); // 게시글 삭제

module.exports = router;
