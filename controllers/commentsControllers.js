const { Comment } = require('../models/index')


const deleteComment = (req, res, next) => {
    const id = req.params.comment_id
    return Comment.findOneAndRemove(id)
        .then((result) => {
            res.send(result)
        })
}

const voteQuery = (req, res, next) => {
    const id = req.params.comment_id;
    const query = req.query.vote;
    Comment.findOneAndUpdate(id, query === 'up' ? { $inc: { 'votes': 1 } } : query === 'down' ? { $inc: { 'votes': - 1 } } : { $inc: { 'votes': 0 } }, { new: true })
        .then(article => {
            res.send(article);
        })
}



module.exports = { deleteComment, voteQuery }