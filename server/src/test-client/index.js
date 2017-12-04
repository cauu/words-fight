var W3CWebSocket = require('websocket').w3cwebsocket;

var client = new W3CWebSocket('ws://localhost:3653/');

client.onerror = function() {
    console.log('Connection Error');
};

client.onopen = function() {
    console.log('WebSocket Client Connected');
    const msg = JSON.stringify({
        BattleInit: {
            Uid: '59aa0f336dc9f502cafb55cc'
        }
    });

    client.send(msg);
};

client.onclose = function() {
    console.log('echo-protocol Client Closed');
};

client.onmessage = function(e) {
    /**
     * @desc response here is an array buffer
     */
    if(e.data instanceof ArrayBuffer) {
        console.log("Received: " + String.fromCharCode.apply(null, new Uint8Array(e.data)));
    } else {
        console.log("Received: " + e.data);
    }
};
