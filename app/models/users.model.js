const db = require("../../db/connection");

exports.selectUsers = () => {
    return db.query(`SELECT * FROM users`)
        .then(({ rows }) => {
            return rows;
        });
};

exports.checkIfUserExists = (username) => {
    return db.query(`SELECT * FROM users WHERE username = $1`, [username])
        .then(({ rows }) => {
            if (rows.length === 0) {
                return Promise.reject({ status: 404, msg: `User with username ${username} Not Found` });
            } else {
                return true;
            };
        });
};

