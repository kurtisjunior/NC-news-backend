const commentsRouter = require('express').Router()
const { deleteComment, voteQuery } = require('../controllers/commentsControllers')


commentsRouter.patch('/:comment_id', voteQuery)
commentsRouter.delete('/:comment_id', deleteComment)







module.exports = commentsRouter;