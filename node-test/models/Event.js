let mongoose = require('mongoose');
let Schema= mongoose.Schema;

const EventSchema = new Schema(
    {
        'user_id': {
            type: String,
            required: true
        },
        'name': {
            type: String,
            required: true
        },
        'description': {
            type: String,
            required: true
        },
        'event_date' : {
            type: Date,
            required: true

        },
        'invited_users': [{type: String}]
    },
    {
        collection: 'Event',
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
);

module.exports= mongoose.model('Event', EventSchema);
