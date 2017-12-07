var W3CWebSocket = require('websocket').w3cwebsocket;

var client1 = new W3CWebSocket('ws://localhost:3653/');
var client2 = new W3CWebSocket('ws://localhost:3653/');
var bid;

const initBattle = (client) => {
    const initMsg = JSON.stringify({
        BattleInit: {
            Uid: '59aa0f336dc9f502cafb55cc'
        }
    });
    client.send(initMsg);
}

const joinBattle = (client) => (bid) => {
    const msg = JSON.stringify({
        JoinBattle: {
            User: {
                id: '59aa0f336dc9f502cafb55c1',
                username: 'yoyo',
                nickname: 'haha'
            },
            Bid: bid
        }
    });

    console.log('join battle', bid);

    client.send(msg);
}

const readyForBattle = (client) => (bid) => (uid) => {
    const msg = JSON.stringify({
        ReadyForBattle: {
            Bid: bid,
            Uid: uid
        }
    });

    console.log(bid, uid);

    client.send(msg);
}

const respHandler = (client) => ({
    RespError: (content) => {
    },
    RespBattleInfo: (content) => {
        console.log(content);
        bid = content.Id;
    },
    RespJoinBattle: (content) => {
    },
    RespBattleStart: (content) => {
    }
});

function start(client) {
    client.onerror = function() {
        console.log('Connection Error');
    };

    client.onopen = function() {
        console.log('WebSocket Client Connected');
    };

    client.onclose = function() {
        console.log('echo-protocol Client Closed');
    };

    client.onmessage = function(e) {
        if(e.data instanceof ArrayBuffer) {
            resp = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(e.data)));

            key = Object.keys(resp)[0];

            content = resp[key];

            console.log('[Receive]', key, content);
            respHandler(client)[key](content);
        }
    };

    return {
        initBattle: () => initBattle(client),
        joinBattle: () => joinBattle(client)(bid),
        readyForBattle: (uid) => readyForBattle(client)(bid)(uid)
    };
}

c1 = start(client1);
c2 = start(client2);

setTimeout(() => c1.initBattle(), 500);
setTimeout(() => c2.joinBattle(), 3000);
setTimeout(function() {
    c1.readyForBattle('59aa0f336dc9f502cafb55cc')
},  5000);
setTimeout(function() {
    c2.readyForBattle('59aa0f336dc9f502cafb55c1')
}, 6000);
