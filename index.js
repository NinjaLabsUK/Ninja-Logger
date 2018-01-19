const dgram = require('dgram');
const WebSocket = require('ws');
const express = require('express');
const path = require('path');

const SERVER_PORT = 8000;
const UDP_PORT = 8001;
const WSS_PORT = 8002;

const app = express();
const udpServer = dgram.createSocket('udp4');
const wsServer = new WebSocket.Server({port: WSS_PORT});

// UDP Server setup
udpServer.on('listening', () => {
    const address = udpServer.address();
    console.log(`UDP server listening on ${address.address}:${address.port}`);
});

udpServer.on('message', (msg, rinfo) => {
    console.log(`Redirecting log to clients ${msg}`);

    wsServer.clients.forEach(client => {
        if(client.readyState === WebSocket.OPEN) {
            client.send(msg);
        }
    });
});

udpServer.bind({
    port: UDP_PORT,
    address: 'localhost'
});

// WS Server setup
wsServer.on('connection', (ws, request) => {
    console.log("New WS Client");
    //ws.send("Log client added!");
});

// Express setup
const publicPath = path.join(__dirname, 'public');
app.use('/public', express.static(publicPath));

const server = app.listen(SERVER_PORT);