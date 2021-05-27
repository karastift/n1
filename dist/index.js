"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverStates = void 0;
const discord_js_1 = require("discord.js");
const config_json_1 = require("./config.json");
const isActivated_1 = require("./utils/isActivated");
const getChannelByName_1 = require("./utils/getChannelByName");
const client = new discord_js_1.Client();
exports.serverStates = {
    server: ['BotTesting'],
};
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
client.on('message', msg => {
    var _a;
    if (!msg.content.startsWith(config_json_1.prefix) || msg.author.bot)
        return;
    const args = msg.content.slice(config_json_1.prefix.length).trim().split('/ +/');
    const command = (_a = args.shift()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    if (command === 'moving') {
        if (!args.length) {
            return msg.channel.send(`You didn't provide any arguments. Possible options are \`start\` or \`stop\` or \`configure\`. Better luck next time ${msg.author}!`);
        }
        else if (args[0] === 'start') {
            if (isActivated_1.isActivated(msg.guild.name)) {
                return msg.channel.send('I am already active and I am trying my best to move you guys in the right channels...');
            }
            else {
                exports.serverStates.server.push(msg.guild.name);
                return msg.channel.send('From now on I will pay much attention on the games you play and I will try to move you in the right voice channels.');
            }
        }
        else if (args[0] === 'stop') {
            if (!isActivated_1.isActivated(msg.guild.name)) {
                return msg.channel.send('I am not even paying attention to your presences right now.');
            }
            else {
                exports.serverStates.server.splice(exports.serverStates.server.indexOf(msg.guild.name), 1);
                return msg.channel.send('Alright I am going to rest now.');
            }
        }
        else if (args[0] === 'configure') {
            const newConfig = args[1];
        }
        console.log(exports.serverStates.server);
        return msg.channel.send(`Are you sure that you typed \`${args[0]}\` right? I just cannot figure out what to do with this argument.`);
    }
    return msg.channel.send(`I am sorry but I do not know what \`${command}\` means.`);
});
client.on('presenceUpdate', presence => {
    var _a, _b;
    if (isActivated_1.isActivated((_a = presence === null || presence === void 0 ? void 0 : presence.guild) === null || _a === void 0 ? void 0 : _a.name)) {
        const user = presence.user;
        const newPresence = user.presence;
        const activity = (_b = user.presence.activities[0]) === null || _b === void 0 ? void 0 : _b.name;
        const guild = presence.guild;
        if (!user ||
            !guild ||
            newPresence.status === 'offline' ||
            newPresence.status === 'invisible')
            return;
        const channel = getChannelByName_1.getChannelByName(guild, activity);
        if (!channel)
            return;
        const member = guild === null || guild === void 0 ? void 0 : guild.member(user);
        if (!(member === null || member === void 0 ? void 0 : member.voice.channel))
            return;
        member === null || member === void 0 ? void 0 : member.voice.setChannel(channel);
    }
});
client.login(config_json_1.token);
//# sourceMappingURL=index.js.map