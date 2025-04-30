const app = require("../../app");
const { selectArticleById, checkIfArticleExists, selectArticles, updateArticleVotes } = require("../models/articles.model");

exports.getArticleById = (req, res, next) => {
    const { article_id } = req.params;
    checkIfArticleExists(article_id)
        .then(() => {
            return selectArticleById(article_id);
        })
        .then((article) => {
            res.status(200).send({ article });
        })
        .catch((err) => {
            next(err);
        });
};

exports.getArticles = (req, res, next) => {
    const { sort_by, order } = req.query;
    return selectArticles(sort_by, order)
        .then((articles) => {
            res.status(200).send({ articles });
        })
        .catch((err) => {
            next(err)
        });
};

exports.patchArticleVotes = (req, res, next) => {
    const { article_id } = req.params;
    const { inc_votes } = req.body;
    checkIfArticleExists(article_id)
        .then(() => {
            return updateArticleVotes(inc_votes, article_id)
        })
        .then((updatedArticle) => {
            res.status(200).send({ updatedArticle })
        })
        .catch((err) => {
            next(err);
        });
};
