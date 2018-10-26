const app = require('./app')

const PORT = process.env || 9090;

app.listen(PORT, () => {
    console.log('server listenning on port 9090');
});