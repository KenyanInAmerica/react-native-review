const jwt = require('jsonwebtoken');
const app = require("../../util/configureApi");
const connectDB = require("../../util/db");
const User = require("../../models/User");
const config = require("../../config");

app.post("*", (req, res) => {
    let finalUser;
    connectDB()
        .then(() => User.create(req.body))
        .then((user) => {
            finalUser = user;
            return jwt.sign({ userId: user._id }, config.JWT_SECRET, { expiresIn: '1m' })
        })
        .then((token) => {
            res.status(200).json({
                result: {
                    firstName: finalUser.firstName,
                    lastName: finalUser.lastName,
                    email: finalUser.email,
                    token
                }
            });
        })
        .catch(err => {
            res.status(err.statusCode || 500).json({
                error: err.message
            });
        });
});

module.exports = app;