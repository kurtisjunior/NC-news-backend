/*
1. build express app x
2. Mount API router  x
3. Define routers and controllers 
Beginning with the routes HTML page x
Get topics x 
Get Articles x 
populate articles belongs to x 
return articles for a certain topic x 



5. return a comment_count property
NC HELP populate the created comments belongs_to and created_by
*/

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const apiRouter = require('./routers/apiRouter')

const DB_URL = 'mongodb://localhost:27017/northcodersNewsDatabase';

const bodyParser = require("body-parser");
app.use(bodyParser.json())


app.set('view engine', 'ejs')

mongoose.connect(DB_URL, { useNewUrlParser: true })
    .then(() => console.log(`connected to ${DB_URL}`))
    .catch(console.log)


app.use('/api', apiRouter);






module.exports = app;