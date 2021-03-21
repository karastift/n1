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
        movingListener(movingUsers(msg));
    }

    else if (msg.content == 'test') {
        test(msg);
    }

    else {console.log('-> Not a command.')}
});

function clearChat(n, message) {
    if (n <= 100) {message.channel.bulkDelete(n);}
    else if (n == NaN) {message.channel.send('This is not a valid number!');}
    else {message.channel.send('Only deleted 100 messages, because you can\'t delete more than 100 messages.');}
}

function movingMain() {
    var guildId = message.guild.id;
    var i = 0;
    while (move) {
        if (i == 10000) {
            movingMover(movingListener(movingUsers(msg)));
            i = 0;
        }
        i++;
    }
}

function movingListener(userList) {
    userGames = {};
    for (u = 0; u < userList.length; u++) {
        var game = u.presence.game;
        game.name = game.name.toString();
        userGames[u] = game.name;
    }
    return userGames;
}

function movingMover(userGames) {
    // get list of channel
    // move users into channels
}

function movingUsers(message) {
    const list = client.guilds.cache.get("myServerID"); 
    list.members.cache.forEach(member => console.log(member.user.username)); 
    return onlineMembers;
}

function test(message) { //funktioniert
    let server = message.guild.id
    const list = client.guilds.cache.get(server); 
    list.members.cache.forEach(member => console.log(member.user.id));
}

client.login(token);