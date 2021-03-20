const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'ODAzMzQ1NTg0ODI3NTMxMjY0.YA8b4A.5U0NfZPTM67TsNg0IKq_dLQBqbI';

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

function movingMain() {
    var guildId = message.guild.id;
    var i = 0;
    while (move) {
        if (i == 10000) {movingMover(movingMover()); i = 0;}
        i++;
    }
}

function movingListener(message, guildId) {
    gamesOfUsers = {};
    //console.log(message.guild.members.filter(member => member.presence.status === "online"));
}

function movingMover(dict) {
    // get list of channel
    // move users into channels
}

client.login(token);