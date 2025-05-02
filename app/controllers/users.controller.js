const app = require("../../app");
const { selectUsers, selectUserByUsername, checkIfUserExists } = require("../models/users.model");

exports.getUsers = (req, res, next) => {
    selectUsers()
        .then((users) => {
            res.status(200).send({ users })
        })
        .catch((err) => {
            next(err)
        });
};

exports.getUserByUsername = (req, res, next) => {
    const { username } = req.params
    checkIfUserExists(username)
        .then(() => {
            return selectUserByUsername(username)
        })
        .then((user) => {
            res.status(200).send({ user })
        })
        .catch((err) => {
            next(err)
        });
};