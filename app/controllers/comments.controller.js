const app = require("../../app");
const { selectCommentsByArticleId, insertComment } = require("../models/comments.model");
const { checkIfArticleExists } = require("../models/articles.model");
const { checkIfUserExists } = require("../models/users.model");

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

exports.postCommentToArticle = (req, res, next) => {
    const { article_id } = req.params;
    const { username, body } = req.body;
    checkIfArticleExists(article_id)
        .then(() => {
            return checkIfUserExists(username)
        })
        .then(() => {
            if (typeof username !== "string" || typeof body !== "string") {
                return Promise.reject({ status: 400, msg: "Bad Request" });
            }
        })
        .then(() => {
            return insertComment(article_id, username, body);
        })
        .then((comment) => {
            res.status(201).send({ comment });
        })
        .catch((err) => {
            next(err)
        });
};

