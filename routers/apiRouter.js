const apiRouter = require('express').Router()
const topicsApi = require('../routers/topicsApi');
const articlesApi = require('../routers/articlesApi')
const alldata = require('../controllers/alldata')


apiRouter.get('/', alldata);
apiRouter.use('/topics', topicsApi);
apiRouter.use('/articles', articlesApi);

module.exports = apiRouter;