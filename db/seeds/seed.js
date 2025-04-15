const db = require("../connection")

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

      *** slug {field which is a unique string that acts as the table's primary key (a slug is a term used in publishing to identify an article)},

      description {field which is a string giving a brief description of a given topic},

      img_url { field which contains a string containing a link to an image representing the topic}
      );`)
    })
    .then(() => {
      return db.query(`CREATE TABLE users (

      username {which is the primary key & unique},

      name ,

      avatar_url
      );`)
    })
    .then(() => {
      return db.query(`CREATE TABLE articles (

      article_id SERIAL PRIMARY KEY,

      title ,

      topic {field which references the slug in the topics table},

      author {field that references a user's primary key (username)},

      body TEXT NOT NULL,

      created_at TIMESTAMP NOT NULL DEFAULT now(),

      votes INT NOT NULL DEFAULT 0,

      article_img_url

      );`)
    })
    .then(() => {
      return db.query(`CREATE TABLE comments (

      comment_id SERIAL PRIMARY KEY,

      article_id {field that references an article's primary key},

      body TEXT NOT NULL,

      votes INT NOT NULL DEFAULT 0,

      author {field that references a user's primary key (username)},

      created_at TIMESTAMP NOT NULL DEFAULT now()
      );`)
    })

};
module.exports = seed;


// make sure NOT NULL included when appropriate
// make sure each is given appropriate data type

// comments references article id from articles. 
// comments must be dropped before article
// article must be made before comments

// comments and articles references author from users username
// comments must be dropped before article which is dropped before users
// users must be made before article and comments. article must be made before comments

// articles references the slug from topics
// articles must be dropped before topics
// topics must be created before articles

