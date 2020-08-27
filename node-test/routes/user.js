const {Router} = require('express');
const route =Router();
const {userAuthorization, passwordAuthorization} = require('../helper/authorization');

const {signup, signin, changePassword, forgetPassword, resetPassword} = require('../controller/user');

route.post('/signup', (req, res) => {
   return signup(req.body, (err, result) => {
      if(err) {
          return res.status(400).send({message: err});
      }
       return res.status(200).send(result);
   });
});

route.post('/signin', (req, res) => {
    return signin(req.body, (err, result) => {
        if(err) {
            return res.status(400).send({message: err});
        }
        return res.status(200).send(result);
    });
});

route.put('/change-password', userAuthorization(), (req, res) => {
    return changePassword(req, (err, result) => {
        if(err) {
            return res.status(400).send({message: err});
        }
        return res.status(200).send(result);
    });
});

route.post('/forget-password',  (req, res) => {
    return forgetPassword(req.body, (err, result) => {
        if(err) {
            return res.status(400).send({message: err});
        }
        return res.status(200).send(result);
    });
});

route.put('/reset-password', passwordAuthorization(),  (req, res) => {
    return resetPassword(req, (err, result) => {
        if(err) {
            return res.status(400).send({message: err});
        }
        return res.status(200).send(result);
    });
});

// route.get('/', userAuthorization(), (req, res) => {
//     return getUserList((err, result) => {
//         if(err) {
//             return res.status(400).send({message: err});
//         }
//         return res.status(200).send(result);
//     });
// });

module.exports = route;
