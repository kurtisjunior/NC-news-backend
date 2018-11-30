const handle400 = ((err, req, res, next) => {
    if (err.status === 400 || err.name === 'CastError') {
        res.status(400).send({ msg: "You made a bad request" });
    }
    else if (err._message === 'articles validation failed' || err._message === 'comments validation failed') {
        res.status(400).send({ msg: 'Required field missing' })
    }
    else next(err);
})

const handle404 = ((err, req, res, next) => {
    if (err.status === 404 && err.msg === 'valid ID not found' || err.msg === 'invalid parameter' || err.msg === 'user not found') res.status(404).send({ msg: 'Requesting invalid parameter' })
    else if (err.status === 404) res.status(404).send({ msg: "page not found" })
    else next(err);
});


const handle500 = ((err, req, res, next) => {
    res.status(500).send({ msg: 'Internal server error' })
});






module.exports = { handle400, handle404, handle500 };





