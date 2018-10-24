/*

2. Get data
a. create models and utils x 
b. define SeedDB function x
c. get topics and insert x 

d. get users and insert 
e. get articles (id's required)
f. get comments (id's required)




NC HELP re dev environment and sanity check of seedDev and seed setup
'you should think about how you will write your seed files to use either test or dev data
depending on the env that you're running'

3. Insert data 

Pending
correct format of the config file

*/
const mongoose = require('mongoose');
const DB_URL = require('../config')
const seedDB = require('./seed')


//data
const { articles, comments, topics, users } = require('./testData/index')

// seeding db functionality in seed file 
mongoose.connect(DB_URL, { useNewUrlParser: true })
    .then(() => {
        console.log(`connected to ${DB_URL}`);
        return seedDB(articles, comments, topics, users)
    })
    //sanity check db
    .then((test) => {
        console.log(test)
    })
    //temp error handling 
    .catch(console.log)

