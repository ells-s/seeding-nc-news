const express = require("express");
const app = express();
const db = require("./db/connection");
const { getApi } = require("./app/controllers/api.controller");
const { getTopics } = require("./app/controllers/topics.controller");

app.get("/api", getApi);

app.get("/api/topics", getTopics);

app.all('/*splat', (req, res) => {
    res.status(404).send({ msg: "Not Found" });
});

module.exports = app;