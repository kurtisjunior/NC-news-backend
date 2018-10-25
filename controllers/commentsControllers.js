const { Comment } = require('../models/index')


const deleteComment = (req, res, next) => {
    const id = req.params.comment_id

    return Comment.findOneAndRemove(id)
        .then((result) => {
            console.log(result);
        })
}

const voteQuery = (req, res, next) => {
    const id = req.params.comment_id;
    const query = req.query.vote;
    console.log(query);
    Comment.findOneAndUpdate(id, query === 'up' ? { $inc: { 'votes': 1 } } : query === 'down' ? { $inc: { 'votes': - 1 } } : { $inc: { 'votes': 0 } })
        .then(article => {
            res.send(article);
        })
}



module.exports = { deleteComment, voteQuery }