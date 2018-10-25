const { Article, Comment, Topic, User } = require('../models/index')


const allData = (req, res, next) => {
    res.render('apiEndpoints');
}




module.exports = allData 