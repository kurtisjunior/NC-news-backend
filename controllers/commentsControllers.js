const { Comment } = require('../models/index')


const deleteComment = (req, res, next) => {
    const invalidId = req.params.comment_id
    return Comment.findOneAndRemove(invalidId)
        .then((result) => {
            if (JSON.stringify(result._id) !== JSON.stringify(invalidId)) {
                return Promise.reject({ status: 404, msg: 'valid ID does not exist' })
            } else {
                res.send(result)
            }
        })
        .catch(next)
}

const voteQuery = (req, res, next) => {
    const query = req.query.vote
    const invalidId = req.params.comment_id
    Comment.findOneAndUpdate(invalidId, query === 'up' ? { $inc: { 'votes': 1 } } : query === 'down' ? { $inc: { 'votes': - 1 } } : { $inc: { 'votes': 0 } }, { new: true })
        .then(article => {
            //because the 'true' returns a new data entry 
            // if (JSON.stringify(article._id) !== JSON.stringify(invalidId)) {
            //     return Promise.reject({ status: 404, msg: 'valid ID does not exist' })
            // } else {
            res.send(article)
        })
        .catch(next)
}


module.exports = { deleteComment, voteQuery }