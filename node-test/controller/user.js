const {User}= require('../models');
const JWT = require('jsonwebtoken');
const config = require('config');
const _ = require('lodash');
const passwordHash = require('password-hash');

const secretKey = config.get('keys.jwt_secret_key');

exports.signup = (body, done) => {
    const {email, password} = body;
    User.findOne({email: email}).then((doc) => {
        if (!_.isEmpty(doc)) {
            return done('email already exists');
        }
        const userPayload = new User({
            ...body,
            password: passwordHash.generate(password)
        });
        userPayload.save().then((response) => {
            return done(null, response);
        }).catch((err) => {
            return done(err);
        });
    }).catch((err) => {
        return done(err);
    });
};

exports.signin = (body, done) => {
    const {email, password} = body;
    User.findOne({email: email}).then((doc) => {
        if(_.isEmpty(doc)) {
            return done('email does not exists');
        }
        if (!passwordHash.verify(password, doc.password)) {
            return done('Incorrect password');
        }
        let tokenPayload = {
            firstname: doc.firstname,
            lastname: doc.lastname,
            email: doc.email,
            user_id: doc._id
        };
        let token= JWT.sign(tokenPayload, secretKey);
        tokenPayload.token = token;
        return done(null, tokenPayload);
    }).catch((err) => {
       return done(err);
    });
};

exports.changePassword = (req, done) => {
    const userId = req.user_id;
    const {old_password, new_password, confirm_password} = req.body;
    User.findOne({_id: userId}).then((doc) => {
        if (_.isEmpty(doc)) {
            return done('user does not exists');
        }
        if (!passwordHash.verify(old_password, doc.password)) {
            return done('old password does not match');
        }
        if (new_password !== confirm_password) {
            return done('confirm password does not match');
        }
        if (old_password === new_password) {
            return done('Use different password');
        }
        doc.password = passwordHash.generate(new_password);
        doc.save().then((response) => {
            return done(null, response);
        }).catch((err) => {
            return done(err);
        });
    }).catch((err) => {
        return done(err);
    });
};

exports.forgetPassword = (body, done) => {
    const {email} = body;
    User.findOne({email: email}).then((doc) => {
        if (_.isEmpty(doc)) {
            return done('user does not exists');
        }
        let tokenPayload = {
            email: doc.email,
            user_id: doc._id
        };
        let token= JWT.sign(tokenPayload, config.get('keys.password_key'));
        return done(null, {auth_token: token});
    }).catch((err) => {
        return done(err);
    });
};

exports.resetPassword = (req, done) => {
    const {new_password, confirm_password} = req.body;
    const userId = req.user_id;
    User.findOne({_id: userId}).then((doc) => {
        if (_.isEmpty(doc)) {
            return done('user does not exists');
        }
        if (new_password !== confirm_password) {
            return done('confirm password does not match');
        }
        doc.password = passwordHash.generate(new_password);
        doc.save().then((response) => {
            return done(null, response);
        }).catch((err) => {
            return done(err);
        });
    }).catch((err) => {
        return done(err);
    });
};

