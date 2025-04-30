const db = require("../../db/connection");

exports.selectArticleById = (article_id) => {
    return db.query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
        .then(({ rows }) => {
            return rows;
        });
};

exports.selectArticles = (sort_by = "created_at", order = "DESC") => {
    // query string to add to
    let queryString = `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT (comments.comment_id) ::INT AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY`

    //greenlisted column names
    const greenlistedSortProperties = ["title", "topic", "author", "created_at", "votes", "article_img_url", "article_id", "comment_count"];

    // if greenlistedSortProperties does not include sortby promise reject 400
    if (!greenlistedSortProperties.includes(sort_by)) {
        return Promise.reject({ status: 400, msg: `${sort_by} is an invalid sort_by column` })
    }

    queryString += ` ${sort_by}`

    // valid order options
    const validSortOrders = ["ASC", "DESC"];

    // if validSortOrders does not include order promise reject 400
    if (!validSortOrders.includes(order.toUpperCase())) {
        return Promise.reject({ status: 400, msg: `${order} is an invalid order value` })
    }

    queryString += ` ${order}`

    return db.query(queryString)
        .then(({ rows }) => {
            return rows;
        });
};

exports.updateArticleVotes = (inc_votes, article_id) => {
    return db.query(`UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *`, [inc_votes, article_id])
        .then(({ rows }) => {
            return rows[0];
        });
};

exports.checkIfArticleExists = (article_id) => {
    return db.query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
        .then(({ rows }) => {
            if (rows.length === 0) {
                return Promise.reject({ status: 404, msg: `Article with id ${article_id} Not Found` });
            } else {
                return true;
            };
        });
};
