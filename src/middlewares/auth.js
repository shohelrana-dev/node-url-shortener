//dependencies
const jwt = require('jsonwebtoken');
const { app_secret } = require('../config.json');

module.exports = (req, res, next) => {
    let token = req.header('auth-token');

    if (!token) {
        return res.status(401).json({
            error: true,
            message: 'User not authenticated'
        });
    }

    jwt.verify(token, app_secret, (err, userInfo) => {
        if (err) {
            return res.status('401').json({
                error: true,
                message: 'User not authenticated'
            });
        }

        req.user = userInfo;
        next();
    });

}