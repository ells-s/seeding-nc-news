const app = require("../../app");
const endpoints = require("../../endpoints.json");

exports.getApi = (req, res, next) => {
    res.status(200).send({ endpoints });
};
