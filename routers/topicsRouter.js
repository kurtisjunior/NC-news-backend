const topicsRouter = require('express').Router();
const { getAllTopics, getTopicArticles, postArticle } = require('../controllers/topicsControllers')


topicsRouter.get('/', getAllTopics);
topicsRouter.get('/:topic_slug/articles', getTopicArticles);
topicsRouter.post('/:topic_slug/articles', postArticle);



module.exports = topicsRouter;


