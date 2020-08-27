const express =  require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const userRoute = require('./routes/user');
const eventRoute = require('./routes/event');

mongoose.plugin((schema) => { schema.options.usePushEach = true; });
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/test_event', {useNewUrlParser: true});
mongoose.connection.on(
    'error',
    function mongooseConnection(error) {
       console.log('MongoDB connection error', error);
    }
);

const app= express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('common'));

app.use('/api/user', userRoute);
app.use('/api/event', eventRoute);

app.listen(3003, () => {
   console.log('Server started on port 3000');
});
