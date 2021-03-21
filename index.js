const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'ODAzMzQ1NTg0ODI3NTMxMjY0.YA8b4A.hYui2lNV02L6sA_f-goSR1nDfKM';

var move = false;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
});

client.on('message', msg => {
    
    console.log('\'' + msg.content + '\' by ' + msg.author);

    if (msg.content == '>Hello') {
        msg.channel.send('World!');
    }
    
    else if (msg.content.includes('>clear')) {
        clearChat(parseInt(msg.content.substring(6))); 
    }

    else if (msg.content == '>startMoving') {
        move = true;
        movingMain();
    }

    else if (msg.content == '>endMoving') {
        move = false;
        movingListener(msg);
    }

    else {console.log('-> Not a command.')}
});

function clearChat(n, message) {
    if (n <= 100) {message.channel.bulkDelete(n);}
    else if (n == NaN) {message.channel.send('This is not a valid number!');}
    else {message.channel.send('Only deleted 100 messages, because you can\'t delete more than 100 messages.');}
}

function movingMain(message) {
    /*
    var i = 0;
    while (move) {
        if (i == 10000) {
            movingMover(movingListener());
            i = 0;
        }
        i++;
    }*/
    movingMover(movingListener(movingUsers(message)));
}

function movingListener(userList) {
    let userGames = {};
    for (u = 0; u < userList.length; u++) {
        var game = userList[u].presence.game;
        game.name = game.name.toString();
        userGames[u] = u.presence.game;
        return userGames;
    }
}

function movingMover(userGames) {
    // get list of channel
    // move users into channels
}

function movingUsers(message) {
    let userList = [];
    const server = client.guilds.get(message.guild.id).id;
    const list = client.guilds.get(server); 
    list.members.forEach(member => userList.push(member.user.id));
    return userList;
}

client.login(token);