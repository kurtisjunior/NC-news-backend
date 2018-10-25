const usersRouter = require('express').Router()
const getUser = require('../controllers/userControllers')



usersRouter.get('/:username', getUser);






module.exports = usersRouter 