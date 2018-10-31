const mongoose = require('mongoose')

//utils to manipulate data (communicates directly and builds per format)
const { formatTopics, formatUsers, formatArticles, formatComments } = require('../utils')

//models 
const { Topic, User, Article, Comment } = require('../models/index')


//define the seedDB function to populate the database 
const seedDB = (articles, comments, topics, users) => {
    return mongoose.connection.dropDatabase()
        .then(() => {
            const allTopics = formatTopics(topics)
            const allUsers = formatUsers(users)
            return Promise.all([Topic.insertMany(allTopics), User.insertMany(allUsers)])
        })
        .then(([topics, users]) => {
            const allArticles = formatArticles(articles, users)
            return Promise.all([Article.insertMany(allArticles), topics, users]);
        })
        .then(([articles, topics, users]) => {
            //all data passed through
            const allcomments = formatComments(comments, users, articles)
            //return everything to help with the test
            return Promise.all([articles, Comment.insertMany(allcomments), topics, users])
        })
        .catch(console.log);
}


module.exports = seedDB;




// .then((array) => {
//     const topics = array[0];
//     const users = array[1];
//     const allArticles = getArticles(articles, users)
//     return Promise.all([Article.insertMany(allArticles), topics, users]);
// })