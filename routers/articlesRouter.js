const articlesRouter = require('express').Router();
const { getAllArticles, oneArticle, allComments, postComment, voteQuery } = require('../controllers/articlesControllers.js')



articlesRouter.get('/', getAllArticles);
articlesRouter.get('/:article_id', oneArticle);
articlesRouter.get('/:article_id/comments', allComments)
articlesRouter.post('/:article_id/comments', postComment)
articlesRouter.patch('/:article_id', voteQuery)




module.exports = articlesRouter;