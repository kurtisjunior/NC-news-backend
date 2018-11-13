const { Article, Comment } = require('../models/index');

const getAllArticles = (req, res, next) => {
    Article.find().populate('created_by')
        .lean()
        .then(articles => {
            const articlesWithCommentCount = articles.map((article => {
                return Comment.find({ belongs_to: article._id })
                    .then((res) => {
                        article.comment_count = res.length
                        return article
                    })
            }))
            return Promise.all(articlesWithCommentCount)
        })
        .then((articles) => {
            res.status(200).send(articles);
        })
        .catch(next);
}


const oneArticle = (req, res, next) => {
    const match = req.params.article_id;
    Article.findOne({ '_id': match }).populate('created_by')
        .lean()
        .then(singleArticle => {
            if (!singleArticle) {
                return Promise.reject({ status: 404, msg: 'valid ID not found' })
            } else {
                Comment.find({ belongs_to: match })
                    .then((comments) => {
                        singleArticle.comment_count = comments.length
                        res.status(200).send(singleArticle)
                    })
            }
        })
        .catch(next)
}

const allComments = (req, res, next) => {
    const match = req.params.article_id;
    Comment.find({ 'belongs_to': match }).populate('belongs_to created_by')
        .then(comments => {
            if (comments.length === 0) {
                return Promise.reject({ status: 404, msg: 'valid ID does not exist' })
            } else {
                res.status(200).send(comments)
            }
        })
        .catch(next)
}


const postComment = (req, res, next) => {
    Comment.create(req.body)
        .then(newComment => {
            return Comment.findById(newComment._id).populate('created_by')
        })
        .then((newComment) => {
            res.status(201).send(newComment);
        })
        .catch(next)
}


const voteQuery = (req, res, next) => {
    const invalidId = req.params.article_id
    const query = req.query.vote;
    Article.findOneAndUpdate(invalidId, query === 'up' ? { $inc: { 'votes': 1 } } : query === 'down' ? { $inc: { 'votes': - 1 } } : { $inc: { 'votes': 0 } }, { new: true })
        .then(article => {
            if (JSON.stringify(article._id) !== JSON.stringify(invalidId)) {
                return Promise.all({ status: 404, msg: 'valid ID does not exist' })
            } else {
                res.send(article);
            }

        })
        .catch(next)
}

module.exports = { getAllArticles, oneArticle, allComments, postComment, voteQuery }


