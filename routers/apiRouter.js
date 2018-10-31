const apiRouter = require('express').Router()
const topicsRouter = require('../routers/topicsRouter');
const articlesRouter = require('../routers/articlesRouter')
const usersRouter = require('../routers/usersRouter')
const commentsRouter = require('../routers/commentsRouter')
const apiEndPoints = require('../controllers/apiEndPoints')


apiRouter.get('/', apiEndPoints);
apiRouter.use('/topics', topicsRouter);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/comments', commentsRouter);




module.exports = apiRouter;