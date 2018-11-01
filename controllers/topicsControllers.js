const { Topic, Article, Comment } = require('../models/index')

const getAllTopics = (req, res, next) => {
    Topic.find()
        .then(topics => res.status(200).send(topics));
}

const getTopicArticles = (req, res, next) => {
    const match = req.params.topic_slug;
    Article.find({ 'belongs_to': match }).populate('created_by')
        .lean()
        .then((articlesForTopic => {
            if (!articlesForTopic || articlesForTopic.length === 0) {
                return Promise.reject({ status: 404 })
            } else {
                const articlesWithCommentCount = articlesForTopic.map((article) => {
                    return Comment.find({ belongs_to: article._id })
                        .then((res) => {
                            article.comment_count = res.length
                            return article
                        })
                })
                return Promise.all(articlesWithCommentCount)
            }
        }))
        .then((articles) => {
            res.status(200).send(articles)
        })
        .catch(next)
}

const postArticle = (req, res, next) => {
    Article.create(req.body)
        .then((newArticle) => {
            Article.findById(newArticle._id)
                .lean()
                .then((article) => {
                    article.comment_count = 0;
                    res.status(201).send(article);
                })
        })
}



module.exports = { getAllTopics, getTopicArticles, postArticle };