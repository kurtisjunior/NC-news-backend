/*
Stage 1 
a.  Get data x 
b.  create models and utils x 
c.  define SeedDB function x
d.  get topics and insert x 
e.  get users and insert x 
f.  get articles (id's required) x 
g.  get comments (id's required) x
h. insert all data x 

Stage 2
a. 


NC HELP re dev environment 
'you should think about how you will write your seed files to use either test or dev data
depending on the env that you're running'


Pending
correct format of the config file 

*/
const mongoose = require('mongoose');
const seedDB = require('./seed')
const { DB_URL } = require('../config')

//use test or dev data depending on environment 
const { database } = require('../config')
const { articles, comments, topics, users } = require(database)


console.log(DB_URL)
// seeding db functionality in seed file 
mongoose.connect(DB_URL)
    .then(() => {
        console.log(`connected to ${DB_URL}`);
        return seedDB(articles, comments, topics, users)
    })
    .then(newsDocs => {
        console.log(`inserted ${newsDocs[0].length} comments, ${newsDocs[1].length} articles, 
        ${newsDocs[2].length} topics, and ${newsDocs[3].length} users`)
        return mongoose.disconnect();
    })
    .catch(console.log)

