const express = require("express");
const app = express();
const db = require("./db/connection");
const { getApi } = require("./app/controllers/api.controller");
const { getTopics } = require("./app/controllers/topics.controller");
const { getArticleById, getArticles, patchArticleVotes } = require("./app/controllers/articles.controller");
const { getCommentsByArticleId, postCommentToArticle, deleteCommentByCommentId } = require("./app/controllers/comments.controller")
const { getUsers, getUserByUsername } = require("./app/controllers/users.controller");

app.use(express.json());

app.get("/api", getApi);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.post("/api/articles/:article_id/comments", postCommentToArticle);

app.patch("/api/articles/:article_id", patchArticleVotes);

app.delete("/api/comments/:comment_id", deleteCommentByCommentId);

app.get("/api/users", getUsers);

app.get("/api/users/:username", getUserByUsername);

app.all("/*splat", (req, res) => {
    res.status(404).send({ msg: "Not Found" });
});

app.use((err, req, res, next) => {
    if (err.code === "22P02" || err.code === "23502") {
        res.status(400).send({ msg: "Bad Request" });
    }
    else {
        next(err);
    };
});

app.use((err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg });
    };
});

module.exports = app;