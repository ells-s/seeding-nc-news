const db = require("../connection")
const format = require('pg-format')
const {
  convertTimestampToDate,
  getArticleIdByTitle
} = require("./utils");

// ORDER:
// DROP: comments, articles, users, topics
// CREATED: topics, users, articles, comments


const seed = ({ topicData, userData, articleData, commentData }) => {
  return db.query(`DROP TABLE IF EXISTS comments;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS articles;`)
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`)
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS topics;`)
    })
    .then(() => {
      return db.query(`CREATE TABLE topics (
      slug VARCHAR(100) PRIMARY KEY,
      description VARCHAR(255) NOT NULL,
      img_url VARCHAR(1000) NOT NULL
      );`)
    })
    .then(() => {
      return db.query(`CREATE TABLE users (
      username VARCHAR(100) PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      avatar_url VARCHAR(1000) NOT NULL
      );`)
    })
    .then(() => {
      return db.query(`CREATE TABLE articles (
      article_id SERIAL PRIMARY KEY,
      title VARCHAR(100) NOT NULL,
      topic VARCHAR(100) NOT NULL REFERENCES topics(slug),
      author VARCHAR(100) NOT NULL REFERENCES users(username),
      body TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      votes INT NOT NULL DEFAULT 0,
      article_img_url VARCHAR(1000) NOT NULL
      );`)
    })
    .then(() => {
      return db.query(`CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,
      article_id INT NOT NULL REFERENCES articles(article_id),
      body TEXT NOT NULL,
      votes INT NOT NULL DEFAULT 0,
      author VARCHAR(100) NOT NULL REFERENCES users(username),
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );`)
    })
    .then(() => {
      const formattedTopicData = topicData.map((topic) => {
        return [
          topic.slug,
          topic.description,
          topic.img_url
        ]
      })
      const insertTopicsQuery = format(
        `INSERT INTO topics (slug, description, img_url) VALUES %L;`, formattedTopicData
      )
      return db.query(insertTopicsQuery)
    })
    .then(() => {
      const formattedUserData = userData.map((user) => {
        return [
          user.username,
          user.name,
          user.avatar_url
        ]
      })
      const insertUsersQuery = format(
        `INSERT INTO users (username, name, avatar_url) VALUES %L;`, formattedUserData
      )
      return db.query(insertUsersQuery)
    })
    .then(() => {
      const formattedArticleData = articleData.map((article) => {
        const articleTimestamp = convertTimestampToDate(article)
        return [
          article.title,
          article.topic,
          article.author,
          article.body,
          articleTimestamp.created_at,
          article.votes,
          article.article_img_url
        ]
      })
      const insertArticlesQuery = format(
        `INSERT INTO articles (title, topic, author, body, created_at, votes, article_img_url) VALUES %L;`, formattedArticleData
      )
      return db.query(insertArticlesQuery)
    })

    .then(() => {
      return db.query('SELECT article_id, title FROM articles;')
    })
    .then((result) => {
      //console.log(result.rows)
      const articleIdFromTitleLookupArr = result.rows.map(pair => {
        //console.log([pair.article_id, pair.title])
        return [pair.article_id, pair.title]
      })
      return articleIdFromTitleLookupArr
    })
    .then((articleIdFromTitleLookupArr) => {
      console.log(articleIdFromTitleLookupArr)
      const formattedCommentData = commentData.map((comment) => {
        const commentTimestamp = convertTimestampToDate(comment)
        const article_id = getArticleIdByTitle(comment.article_title, articleIdFromTitleLookupArr)
        return [
          article_id,
          comment.body,
          comment.votes,
          comment.author,
          commentTimestamp.created_at
        ]
      })
      const insertCommentsQuery = format(
        `INSERT INTO comments (article_id, body, votes, author, created_at) VALUES %L;`, formattedCommentData
      )
      return db.query(insertCommentsQuery)

    })
};

module.exports = seed;



