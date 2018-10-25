const topicsRouter = require('express').Router();
const { getAllTopics, getTopicArticles } = require('../controllers/topicsControllers')


topicsRouter.get('/', getAllTopics);
topicsRouter.get('/:topic_slug/articles', getTopicArticles)



module.exports = topicsRouter;


