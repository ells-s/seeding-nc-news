const express = require("express");
const app = express();
const db = require("./db/connection");
const { getApi } = require("./app/controllers/api.controller");
const { getTopics } = require("./app/controllers/topics.controller");
const { getArticleById, getArticles } = require("./app/controllers/articles.controller");

app.get("/api", getApi);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles", getArticles);

app.all("/*splat", (req, res) => {
    res.status(404).send({ msg: "Not Found" });
});

app.use((err, req, res, next) => {
    if (err.code === "22P02") {
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