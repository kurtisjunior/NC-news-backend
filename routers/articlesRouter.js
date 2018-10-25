const articlesRouter = require('express').Router();
const { getAllArticles, oneArticle } = require('../controllers/articlesControllers')



articlesRouter.get('/', getAllArticles);
articlesRouter.get('/:article_id', oneArticle);




module.exports = articlesRouter;