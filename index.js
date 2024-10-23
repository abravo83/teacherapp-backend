// Description: This file is the entry point for the application.
// It creates the server and listens on the specified port.
const http = require('http');
const app = require('./src/app');

require('dotenv').config();

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
server.listen(PORT);

server.on('listening', () => {
    console.log(`Server listening on port ${PORT}`);
});

server.on('error', (error) => {
    console.log(error);
});