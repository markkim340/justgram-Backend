const postDao = require("../models/postDao");

const getPostings = async () => {
  const getPostings = await postDao.getPostings();
  return getPostings;
};

const getPostingsById = async () => {
  const getPostingsById = await postDao.getPostingsById();
  return getPostingsById;
};

const createPostings = async (user_id, contents) => {
  const createPostings = await postDao.createPostings(user_id, contents);
  return createPostings;
};

const updatePostings = async (id, contents) => {
  const updatePostings = await postDao.updatePostings(id, contents);
  return updatePostings;
};

const deletePostings = async (postId) => {
  const deletePostings = await postDao.deletePostings(postId);
  return deletePostings;
};

module.exports = {
  getPostings,
  createPostings,
  getPostingsById,
  updatePostings,
  deletePostings,
};
