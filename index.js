const path = require('path');
const express = require('express');
require('dotenv').config();
const app = express();

//node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);

require('./sockets/socket');

const port = process.env.PORT;

const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));

server.listen(port, (err) => {
    if(err) throw new Error(err);

    console.log(`Servidor corriendo en ${port}`)

});