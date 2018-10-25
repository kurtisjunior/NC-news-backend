/* to do
set the environment to test 
install mocha, chai, and superagent 
edit script to run test
drop and create database in here somewhow 
connect and disconnect the database 
*/

process.env.NODE_ENV = "test"

const { expect } = require('chai');
const app = require('../app')
const mongoose = require('mongoose')
const request = require('supertest')(app);
const seedDB = require('../seed/seed')
const { getTopics, getUsers, getArticles, getComments } = require('../utils')


describe('/api', () => {
    //need to keep the data in scope of the whole test suite
    let topics, users, articles, comments;
    //mocha hook (do something before this)
    beforeEach(() => {
        //return because we need to wait for it to complete 
        return seedDB(getTopics, getUsers, getArticles, getComments).then(docs => {
            topics = docs[0]
            users = docs[1]
            articles = docs[2]
            comments = docs[3]
        })
    })
})
describe('/', () => {
    it('returns a status 200 for the homepage', () => {
        return request
            .get('/api')
            .expect(200)
            .then(res => {
                console.log(res.body)
                // expect(res.body)
            })
    })
    //or afterEach test then disconnect
    after(() => {
        mongoose.disconnect()
    })
})


/*


Lecture 

then test the topics.length 
and other specs on the docs

find by Id posible alternative to the find by article_id 

GET one id test  
.get('/api/articles/${articlesDocs[0]._id})   ---> get the first one from the collection 
.expect(200)
expect(res.body._id).to.equal(articlesDocs[0]._id) --> docs is a string, db is a js object so needs to be tured to string representation ${articleDocs[0]._id} --> mongo quirk
*REMEMBER The above can be translated to is the variable (topics.something) equal to the topics something I have in my DB 




img for error handling 404 (article doesnt exist)
forces rejection 

three error blocks in the app (extracted into an errors folder)
img








*/