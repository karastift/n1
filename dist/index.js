"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverStates = void 0;
const discord_js_1 = require("discord.js");
const config_json_1 = require("./config.json");
const messages_1 = require("./messages");
const convertMessage_1 = require("./utils/convertMessage");
const formatConfigToObject_1 = require("./utils/formatConfigToObject");
const getChannelByName_1 = require("./utils/getChannelByName");
const isActivated_1 = require("./utils/isActivated");
const client = new discord_js_1.Client();
exports.serverStates = {
    server: ['BotTesting'],
};
const validToMove = (user, guild, newPresence) => {
    if (!user ||
        !guild ||
        (newPresence === null || newPresence === void 0 ? void 0 : newPresence.status) === 'offline' ||
        (newPresence === null || newPresence === void 0 ? void 0 : newPresence.status) === 'invisible')
        return false;
    return true;
};
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
client.on('message', msg => {
    if (!msg.content.startsWith(config_json_1.prefix) || msg.author.bot)
        return;
    const { command, args } = convertMessage_1.convertMessage(msg.content);
    if (command === 'moving') {
        if (!args.length) {
            return msg.channel.send(messages_1.noArgsMessage(msg.author));
        }
        else if (args[0] === 'start') {
            if (isActivated_1.isActivated(msg.guild.name)) {
                return msg.channel.send(messages_1.alreadyActiveMessage);
            }
            else {
                exports.serverStates.server.push(msg.guild.name);
                return msg.channel.send(messages_1.startedMessage);
            }
        }
        else if (args[0] === 'stop') {
            if (!isActivated_1.isActivated(msg.guild.name)) {
                return msg.channel.send(messages_1.alreadyStoppedMessage);
            }
            else {
                exports.serverStates.server.splice(exports.serverStates.server.indexOf(msg.guild.name), 1);
                return msg.channel.send(messages_1.stoppedMessage);
            }
        }
        else if (args[0] === 'configure') {
            return msg.channel.send(messages_1.notDeveloped);
            const pattern = args[0];
            const rawConfig = msg.content.slice(msg.content.indexOf(pattern) + pattern.length);
            const newConfig = formatConfigToObject_1.formatConfigToObject(rawConfig);
            return msg.channel.send('Configured new. ' + JSON.stringify(newConfig));
        }
        console.log(exports.serverStates.server);
        return msg.channel.send(messages_1.wrongArgMessage(args));
    }
    return msg.channel.send(messages_1.wrongCommandMessage(command));
});
client.on('presenceUpdate', presence => {
    var _a, _b;
    if (isActivated_1.isActivated((_a = presence === null || presence === void 0 ? void 0 : presence.guild) === null || _a === void 0 ? void 0 : _a.name)) {
        const user = presence.user;
        const newPresence = user.presence;
        const activity = (_b = user.presence.activities[0]) === null || _b === void 0 ? void 0 : _b.name;
        const guild = presence.guild;
        if (validToMove(user, guild, newPresence))
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