const mongoose = require('mongoose');
const express = require('express');
const app = express();
const apiRouter = require('./routers/apiRouter')
const { DB_URL } = process.env.NODE_ENV === 'production' ? process.env : require('./config')
const { handle400, handle404, handle500 } = require('./errors')
const cors = require('cors')


const bodyParser = require("body-parser");
app.use(bodyParser.json())
app.use(cors())




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
TODO:

1. REVISE -> body.length comments okay for status 400 invalid ID requests. 

2. Check all error messages. More specific error messages ? 

3. All users all topics utils functions. Can do it without becuase of the model but need to revise the paths. 

4. Finish readMe
    a. Seed the database in the step by step ?

5. give Mitch's notes the once over to ensure completion. 

6. Write extra test for invalid IDs 404's 
*/