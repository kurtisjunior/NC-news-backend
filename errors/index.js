//Sanity check everything 

const handle400 = ((err, req, res, next) => {
    if (err.status === 400 || err.name === 'CastError') {
        res.status(400).send({ msg: "You made a bad request" });
    }
    else next(err);
})

const handle404 = ((err, req, res, next) => {
    if (err.status === 404) {
        res.status(404).send({ msg: "page not found" })
    }
    else next(err);
});


const handle500 = ((err, req, res, next) => {
    res.status(500).send({ msg: 'Internal server error' })
});




// //deal with 404 errors from bad queries
// else if (err instanceof QueryResultError && err.code === noData)
//     res.status(404).send({ msg: err.message || "Not found" });
// else next(err);



module.exports = { handle400, handle404, handle500 };





