const { Article, Comment } = require('../models/index');



const getAllArticles = (req, res, next) => {
    Article.find().populate('created_by')
        .then(articles => res.status(200).send(articles));
}

const oneArticle = (req, res, next) => {
    const match = req.params.article_id;
    Article.find({ '_id': match }).populate('created_by')
        .then(singleArticle => res.status(200).send(singleArticle))
}

const allComments = (req, res, next) => {
    const match = req.params.article_id;
    Comment.find({ 'belongs_to': match }).populate('belongs_to').populate('created_by')
        .then(comments => res.status(200).send(comments))
}

const postComment = (req, res, next) => {
    Comment.create(req.body)
        .then(newComment => res.status(200).send(newComment));
}





module.exports = { getAllArticles, oneArticle, allComments, postComment }




//populate the created by 