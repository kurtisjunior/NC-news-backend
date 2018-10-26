const app = require('./app')

const port = process.env || 9090;

app.listen(port, () => {
    console.log('server listenning on port 9090');
});