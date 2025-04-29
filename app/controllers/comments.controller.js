const app = require("../../app");
const { selectCommentsByArticleId } = require("../models/comments.model");
const { checkIfArticleExists } = require("../models/articles.model");

exports.getCommentsByArticleId = (req, res, next) => {
    const { article_id } = req.params;
    checkIfArticleExists(article_id)
        .then(() => {
            return selectCommentsByArticleId(article_id);
        })
        .then((comments) => {
            res.status(200).send({ comments });
        })
        .catch((err) => {
            next(err)
        });
};