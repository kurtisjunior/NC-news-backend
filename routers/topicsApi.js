const topicsApi = require('express').Router();
const { getAllTopics, getTopicArticles } = require('../controllers/topicsControllers')


topicsApi.get('/', getAllTopics);
topicsApi.get('/:topic_slug/articles', getTopicArticles)



module.exports = topicsApi;


