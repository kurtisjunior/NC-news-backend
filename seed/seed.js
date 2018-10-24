const mongoose = require('mongoose')

//utils to manipulate data (communicates directly and builds per format)
const { getTopics, getUsers, getArticles, getComments } = require('../utils')

//models 
const { Topic, User, Article, Comment } = require('../models/index')


//define the seedDB function to populate the database 
const seedDB = (articles, comments, topics, users) => {
    return mongoose.connection.dropDatabase()
        .then(() => {
            const allTopics = getTopics(topics)
            const allUsers = getUsers(users)
            return Promise.all([Topic.insertMany(allTopics), User.insertMany(allUsers)])
        })
        .then((array) => {
            const topics = array[0];
            const users = array[1];
            const allArticles = getArticles(articles, users)
            return Promise.all([Article.insertMany(allArticles), topics, users]);
        })
        .then((array) => {
            const articles = array[0];
            const users = array[2];

            //all data passed through
            const allComments = getComments(comments, users, articles)
            console.log(allComments);
            // console.log(allComments);
        })
        .catch(console.log);
}


module.exports = seedDB;


//put the comments into the DB 
//check db status for comments 
//check db for all data
//begin API

