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

const getPostings = async () => {
  const getPostings = await myDataSource.query(
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
  return getPostings;
};

const getPostingsById = async () => {
  const getPostingsById = await myDataSource.query(
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
    WHERE users.id = 1
    GROUP BY users.id
    `
  );
  return getPostingsById;
};

const createPostings = async (user_id, contents) => {
  const createPostings = await myDataSource.query(
    `INSERT INTO postings (user_id, contents) VALUES (?,?)`,
    [user_id, contents]
  );
};

const updatePostings = async (id, contents) => {
  const updatePostings = await myDataSource.query(
    // 게시물 수정 //
    `
  UPDATE
  postings
  SET
  contents = ?
  WHERE id = ?
  `,
    [contents, id]
  );
  // 수정된 게시물 불러오기 //
  const newPosts = await myDataSource.query(`
  SELECT 
    users.id as user_Id,
    users.profile_image as userProfileImage,
    postings.id as postingId,
    postings.contents as postingContent
  FROM postings
    JOIN users ON users.id = postings.user_id;
  `);
  return newPosts;
};

const deletePostings = async (postId) => {
  const deletePostings = await myDataSource.query(
    `
  DELETE
  FROM
    postings
  WHERE postings.id = ?
  `,
    [postId]
  );
  return deletePostings;
};

module.exports = {
  getPostings,
  createPostings,
  getPostingsById,
  updatePostings,
  deletePostings,
};
