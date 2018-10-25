const articlesApi = require('express').Router();
const { getAllArticles, oneArticle } = require('../controllers/articlesControllers')



articlesApi.get('/', getAllArticles);
articlesApi.get('/:article_id', oneArticle);




module.exports = articlesApi;