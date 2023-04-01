const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/router');
var bodyParser = require('body-parser')

require('dotenv').config();

const mongoURL = "mongodb+srv://admin:"+process.env.MONGO_PASS+"@cluster0.q1chg.mongodb.net/?retryWrites=true&w=majority"

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(routes);

app.use(express.json());


//db connection
const db = mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));




app.listen(3000, () => {
    console.log('Listening on port 3000');
    });