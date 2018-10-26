const { Article, Comment } = require('../models/index');

const getAllArticles = (req, res, next) => {
    Article.find().populate('created_by')
        .then(articles => {
            res.status(200).send(articles);
        })
        .catch(next);
}

const oneArticle = (req, res, next) => {
    const match = req.params.article_id;
    Article.findOne({ '_id': match }).populate('created_by')
        .then(singleArticle => {
            if (!singleArticle) {
                return Promise.reject({ status: 404 })
            } else {
                res.status(200).send(singleArticle)
            }
        })
        .catch(next)
}

const allComments = (req, res, next) => {
    const match = req.params.article_id;
    Comment.find({ 'belongs_to': match }).populate('belongs_to').populate('created_by')
        .then(comments => res.status(200).send(comments))
}

const postComment = (req, res, next) => {
    Comment.create(req.body)
        .then((newComment) => {
            res.status(201).send(newComment);
        })
}

//PROBLEMS WITH POPULATE AND CALLBACK 
// .then(newComment => {
//     //returns the new comment populated
//     return newComment.findById(newComment._id).populate('created_by')
// })


const voteQuery = (req, res, next) => {
    const id = req.params.article_id
    const query = req.query.vote;
    //not great readability but does the job
    Article.findOneAndUpdate(id, query === 'up' ? { $inc: { 'votes': 1 } } : query === 'down' ? { $inc: { 'votes': - 1 } } : { $inc: { 'votes': 0 } }, { new: true })
        .then(article => {
            res.send(article);
        })
}

module.exports = { getAllArticles, oneArticle, allComments, postComment, voteQuery }

