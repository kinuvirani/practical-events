const JWT = require('jsonwebtoken');
const config = require('config');
const _ = require('lodash');

exports.userAuthorization = () => {
    return function (req, res, next) {
        if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
            return res.status(401).json({ message: 'Missing Authorization Header' });
        }
        const token=req.headers.authorization.split(' ').pop();
        const decoded = JWT.verify(token, config.get('keys.jwt_secret_key'));
        req.user_id = decoded.user_id;
        return next();
    }
};

exports.passwordAuthorization = () => {
    return function (req, res, next) {
        if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
            return res.status(401).json({ message: 'Missing Authorization Header' });
        }
        const token=req.headers.authorization.split(' ').pop();
        const decoded = JWT.verify(token, config.get('keys.password_key'));
        req.user_id = decoded.user_id;
        return next();
    }
};
