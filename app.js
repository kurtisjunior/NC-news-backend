const mongoose = require('mongoose')
const DB_URL = require('./config')


mongoose.connect(DB_URL, { useNewUrlParser: true })
    .then(() => console.log(`connected to ${DB_URL}`))
    .catch(console.log)



module.exports = app;