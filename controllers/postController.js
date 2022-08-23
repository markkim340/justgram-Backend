const postService = require("../services/postService");

const getPostings = async (req, res) => {
  const getPostings = await postService.getPostings();
  res.status(200).json({ data: getPostings });
};

const getPostingsById = async (req, res) => {
  const getPostingsById = await postService.getPostingsById();
  res.status(200).json({ data: getPostingsById });
};

const createPostings = async (req, res) => {
  const { user_id, contents } = req.body;
  const createPostings = await postService.createPostings(user_id, contents);
  res.status(201).json({ message: "Post Created!!" });
};

const updatePostings = async (req, res) => {
  const { id, contents } = req.body;
  const updatePostings = await postService.updatePostings(id, contents);
  res.status(200).json({ message: updatePostings });
};

const deletePostings = async (req, res) => {
  try {
    const postId = req.query.id;
    if (!postId) {
      return res.status(400).json({ message: "KEY ERROR..." });
    }
    await postService.deletePostings(postId);
    res.status(201).json({ message: "Delete Complete..." });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  getPostings,
  createPostings,
  getPostingsById,
  updatePostings,
  deletePostings,
};
