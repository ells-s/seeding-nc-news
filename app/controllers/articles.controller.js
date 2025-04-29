const app = require("../../app");
const { selectArticleById, checkIfArticleExists, selectArticles } = require("../models/articles.model");

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
    return selectArticles().then((articles) => {
        res.status(200).send({ articles });
    });
};

