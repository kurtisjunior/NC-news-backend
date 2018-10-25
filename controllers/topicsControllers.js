const { Topic, Article } = require('../models/index')

const getAllTopics = (req, res, next) => {
    Topic.find()
        .then(topics => res.status(200).send(topics));
}



const getTopicArticles = (req, res, next) => {
    // console.log(req.params.topic_slug);
    const match = req.params.topic_slug;

    Article.find({ 'belongs_to': match })
        .then(articlesForTopic => res.status(200).send(articlesForTopic));
}


module.exports = { getAllTopics, getTopicArticles };