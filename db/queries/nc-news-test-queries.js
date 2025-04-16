const db = require('../connection');


/* GET ALL THE USERS */
function getAllUsers() {
    return db.query(
        `SELECT * FROM users;`
    )
        .then((result) => {
            console.log(result.rows)
        })
}
//getAllUsers()

function getAllUsersNames() {
    return db.query(
        `SELECT * FROM users;`
    )
        .then((result) => {
            return result.rows
        })
        .then((result) => {
            return result.map(user => user.name)
        })
        .then((result) => {
            console.log(result)
        })
}
//getAllUsersNames()

function getAllUsersUsernames() {
    return db.query(
        `SELECT * FROM users;`
    )
        .then((result) => {
            return result.rows
        })
        .then((result) => {
            return result.map(user => user.username)
        })
        .then((result) => {
            console.log(result)
        })
}
//getAllUsersUsernames()



/* GET ALL OF THE ARTICLES WHERE THE TOPIC IS CODING */
function getAllArticlesWhereTopicCoding() {
    return db.query(
        `SELECT * FROM articles
        WHERE topic = 'coding';`
    )
        .then((result) => {
            console.log(result.rows)
        })
}
//getAllArticlesWhereTopicCoding()

function getAllArticleTitlesWhereTopicCoding() {
    return db.query(
        `SELECT * FROM articles
        WHERE topic = 'coding';`
    )
        .then((result) => {
            return result.rows
        })
        .then((result) => {
            return result.map(article => article.title)
        })
        .then((result) => {
            console.log(result)
        })
}
//getAllArticleTitlesWhereTopicCoding()



/* GET ALL OF THE COMMENTS WHERE THE VOTES ARE LESS THAN ZERO */
function getAllCommentsDataWithLessThanZeroVotes() {
    return db.query(
        `SELECT * FROM comments
        WHERE votes < 0;`
    )
        .then((result) => {
            console.log(result.rows)
        })
}
//getAllCommentsDataWithLessThanZeroVotes()

function getAllCommentsWithLessThanZeroVotes() {
    return db.query(
        `SELECT * FROM comments
        WHERE votes < 0;`
    )
        .then((result) => {
            return result.rows
        })
        .then((result) => {
            return result.map(comment => [comment.body, comment.votes])
        })
        .then((result) => {
            console.log(result)
        })
}
//getAllCommentsWithLessThanZeroVotes()



/* GET ALL OF THE TOPICS */
function getAllTopicsData() {
    return db.query(
        `SELECT * FROM topics;`
    )
        .then((result) => {
            console.log(result.rows)
        })
}
//getAllTopicsData()

function getAllTopics() {
    return db.query(
        `SELECT * FROM articles;`
    )
        .then((result) => {
            return result.rows
        })
        .then((result) => {
            return result.map(article => article.topic)
        })
        .then((result) => {
            return [...new Set(result)]
        })
        .then((result) => {
            console.log(result)
        })

}
//getAllTopics()



/* GET ALL OF THE ARTICLES BY USER GRUMPY19 */
function getAllArticlesByGrumpy19() {
    return db.query(
        `SELECT * FROM articles
        WHERE author = 'grumpy19';`
    )
        .then((result) => {
            console.log(result.rows)
        })
}
//getAllArticlesByGrumpy19()

function getAllArticlesTitlesByGrumpy19() {
    return db.query(
        `SELECT * FROM articles
        WHERE author = 'grumpy19';`
    )
        .then((result) => {
            return result.rows
        })
        .then((result) => {
            return result.map(article => [article.author, article.title])
        })
        .then((result) => {
            console.log(result)
        })
}
//getAllArticlesTitlesByGrumpy19()



/* GET ALL OF THE COMMENTS THAT HAVE MORE THAN 10 VOTES */
function getAllCommentsDataWithMoreThanTenVotes() {
    return db.query(
        `SELECT * FROM comments
        WHERE votes > 10;`
    )
        .then((result) => {
            console.log(result.rows)
        })
}
//getAllCommentsDataWithMoreThanTenVotes()

function getAllCommentsWithMoreThanTenVotes() {
    return db.query(
        `SELECT * FROM comments
        WHERE votes > 10;`
    )
        .then((result) => {
            return result.rows
        })
        .then((result) => {
            return result.map(comment => [comment.body, comment.votes])
        })
        .then((result) => {
            console.log(result)
        })
}
//getAllCommentsWithMoreThanTenVotes()