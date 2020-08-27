const {Event, User}= require('../models');
const _ = require('lodash');
const async = require('async');
const moment = require('moment');

exports.addEvent = (body, done) => {
    const eventPayload = new Event({
        ...body,
        event_date:new Date(body.event_date)
    });
    eventPayload.save().then((response) => {
        return done(null, response);
    }).catch((err) => {
        return done(err);
    });
};

// exports.getEventList = (done) => {
//     Event.find().then((response) => {
//         return done(null, response);
//     }).catch((err) => {
//         return done(err);
//     })
// };

exports.getUserEvents = (req, done) => {
    const userId = req.user_id;
    const args = req.query;
    let query = {};
    query.$or = [
        {user_id: userId},
        {invited_users: {$in: userId}}
    ];
    if (args.name) {
        query.name = {$regex: new RegExp('.*' + args.name + '.*', 'i')}
    }
    if (args.start_date && args.end_date ) {
        query.event_date= {
            $gte: new Date(args.start_date),
            $lte: new Date(args.end_date)
        }
    }
    Event.find(query)
        .sort({'event_date': 1})
        .exec((err, events) => {
        if (err) {
            return done(err);
        }
        let eventList = [];
        async.eachLimit(events, 5, (event, eachcb) => {
            CheckUser({_id: event.user_id}, (userError, userRecord) => {
                if (userError) {
                    return eachcb(userError);
                }
                let eventObj = event.toObject();
                eventObj.event_date= moment(eventObj.event_date).format('MM/DD/YYYY')
                eventObj.user = userRecord.firstname + ' ' + userRecord.lastname;
                delete eventObj.user_id;
                eventList.push(eventObj);
                return eachcb();
            })
            }, (eachError) => {
                if (eachError) {
                    return done(eachError);
                }
                return done(null, eventList);
        });
    })
};

// exports.getInvitedEvents = (req, done) => {
//     const userId = req.user_id;
//     User.findOne({_id: userId}).then((doc) => {
//         if (_.isEmpty(doc)) {
//             return done('user does not exists');
//         }
//         Event.find({invited_users: {$in: userId}}).then((response) => {
//
//             return done(null, response);
//         }).catch((err) => {
//             return done(err);
//         })
//     }).catch((err) => {
//         return done(err);
//     });
// };

exports.getEvent = (eventId, done) => {
    Event.findOne({_id: eventId}).then((doc) => {
        if (_.isEmpty(doc)) {
            return done('event does not exists');
        }
        let eventObj =  doc.toObject();
        User.find({_id: {$in: eventObj.invited_users}}).then((response) => {
            eventObj.invited_users = response;
            return done(null, eventObj);
        }).catch((err) => {
            return done(err);
        });
    }).catch((err) => {
        return done(err);
    });
};

exports.updateEvent = (eventId, body, done) => {
    Event.findOne({_id: eventId}).then((event) => {
        if (_.isEmpty(event)) {
            return done('event does not exists');
        }
        event.name = body.name ? body.name : event.name;
        event.description = body.description ? body.description : event.description;
        event.event_date = body.event_date ? body.event_date : event.event_date;
        event.save().then((response) => {
            return done(null, response);
        }).catch((err) => {
            return done(err);
        });
    }).catch((err) => {
        return done(err);
    });
};


//For checking user existence
function CheckUser(query, callback) {
    User.findOne(query)
        .select('-password')
        .exec().then((userRecord) => {
        return callback(null, userRecord);
    }).catch((err) => {
        return callback(err);
    })
}
