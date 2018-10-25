const { User } = require('../models/index')


const getUser = (req, res, next) => {
    const match = req.params.username
    User.find({ 'username': match })
        .then(user => res.status(200).send(user))
}


module.exports = getUser;