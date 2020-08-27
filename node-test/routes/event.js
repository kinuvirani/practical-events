const {Router} = require('express');
const route =Router();

const {addEvent, getUserEvents, getEvent, updateEvent} = require('../controller/event');
const {userAuthorization} = require('../helper/authorization');

route.post('/save', (req, res) => {
    return addEvent(req.body, (err, result) => {
        if(err) {
            return res.status(400).send({message: err});
        }
        return res.status(200).send(result);
    });
});

// route.get('/', userAuthorization(), (req, res) => {
//     return getEventList((err, result) => {
//         if(err) {
//             return res.status(400).send({message: err});
//         }
//         return res.status(200).send(result);
//     });
// });

route.get('/', userAuthorization(), (req, res) => {
    return getUserEvents(req, (err, result) => {
        if(err) {
            return res.status(400).send({message: err});
        }
        return res.status(200).send(result);
    });
});

// route.get('/user/invitation', userAuthorization(), (req, res) => {
//     return getInvitedEvents(req, (err, result) => {
//         if(err) {
//             return res.status(400).send({message: err});
//         }
//         return res.status(200).send(result);
//     });
// });

route.get('/:id', userAuthorization(), (req, res) => {
    return getEvent(req.params.id, (err, result) => {
        if(err) {
            return res.status(400).send({message: err});
        }
        return res.status(200).send(result);
    });
});

route.put('/:id', userAuthorization(), (req, res) => {
    return updateEvent(req.params.id, req.body, (err, result) => {
        if(err) {
            return res.status(400).send({message: err});
        }
        return res.status(200).send(result);
    });
});

module.exports = route;
