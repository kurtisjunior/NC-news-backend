const mongoose = require('mongoose');
const express = require('express');
const app = express();
const apiRouter = require('./routers/apiRouter')
const { DB_URL } = process.env.NODE_ENV === 'production' ? process.env : require('./config')
const { handle400, handle404, handle500 } = require('./errors')

const bodyParser = require("body-parser");
app.use(bodyParser.json())


app.set('view engine', 'ejs')

mongoose.connect(DB_URL, { useNewUrlParser: true })
    .then(() => console.log(`connected to ${DB_URL}`))
    .catch(console.log)

app.use('/api', apiRouter);


app.use('/*', (req, res, next) => {
    next({ status: 400 });
});

app.use(handle400);
app.use(handle404);
app.use(handle500);




module.exports = app;




/* notes 
QUESTIONS
Post Article comments. they're always going to be 0, right ?

spec tests
.get(`/api/topics/tennis/articles`) is this path okay ? 
Are my status codes correct ? 





TO DO: 
Mitches notes
continue writing tests and refactoringthe controllers with a catch block**. Then trace the error message
*/