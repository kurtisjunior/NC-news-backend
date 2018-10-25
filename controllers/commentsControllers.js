const { Comment } = require('../models/index')


const deleteComment = (req, res, next) => {
    const id = req.params.comment_id

    return Comment.findOneAndRemove(id)
        .then((result) => {
            console.log(result);
        })
}



module.exports = deleteComment