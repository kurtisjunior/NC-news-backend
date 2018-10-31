const { Topic, Article, Comment } = require('../models/index')

const getAllTopics = (req, res, next) => {
    Topic.find()
        .then(topics => res.status(200).send(topics));
}

const getTopicArticles = (req, res, next) => {
    const match = req.params.topic_slug;
    Article.find({ 'belongs_to': match })
        .lean()
        .then((articlesForTopic => {
            const articlesWithCommentCount = articlesForTopic.map((article) => {
                return Comment.find({ belongs_to: article._id })
                    .then((res) => {
                        article.comment_count = res.length
                        return article
                    })
            })
            return Promise.all(articlesWithCommentCount)
        }))
        .then((articles) => {
            res.status(200).send(articles)

        })
}


const postArticle = (req, res, next) => {
    Article.create(req.body)
        .then(newArticle => res.status(201).send(newArticle))
}




module.exports = { getAllTopics, getTopicArticles, postArticle };