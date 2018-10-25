const { Article } = require('../models/index');



const getAllArticles = (req, res, next) => {
    Article.find().populate('created_by')
        .then(articles => res.status(200).send(articles));
}

const oneArticle = (req, res, next) => {
    const match = req.params.article_id;
    Article.find({ '_id': match }).populate('created_by')
        .then(singleArticle => res.status(200).send(singleArticle))
}



module.exports = { getAllArticles, oneArticle }




//populate the created by 