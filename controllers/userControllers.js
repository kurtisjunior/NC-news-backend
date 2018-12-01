const { User } = require('../models/index')


const getUser = (req, res, next) => {
    const match = req.params.username
    User.findOne({ 'username': match })
        .then(user => {
            if (!user) {
                return Promise.reject({ status: 404, msg: 'user not found' })
            } else {
                res.status(200).send({ user })
            }
        })
        .catch(next)
}

module.exports = getUser;




// `{ user: [{ ... }]}`