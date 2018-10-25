const articlesRouter = require('express').Router();
const { getAllArticles, oneArticle, allComments, postComment } = require('../controllers/articlesControllers')



articlesRouter.get('/', getAllArticles);
articlesRouter.get('/:article_id', oneArticle);
articlesRouter.get('/:article_id/comments', allComments)
articlesRouter.post('/:article_id/comments', postComment)




module.exports = articlesRouter;