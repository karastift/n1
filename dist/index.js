"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const client = new discord_js_1.Client();
const token = 'ODAzMzQ1NTg0ODI3NTMxMjY0.YA8b4A.hYui2lNV02L6sA_f-goSR1nDfKM';
let serverStates = {
    server: [""],
};
const isActivated = (serverName) => {
    if (typeof serverName === 'undefined') {
        return false;
    }
    if (serverStates.server.includes(serverName)) {
        return true;
    }
    return false;
};
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
client.on('message', msg => {
    if (msg.content == '>Hello') {
        msg.channel.send('World!');
    }
    else if (msg.content == 'toggle') {
        if (isActivated(msg.guild.name)) {
            serverStates.server.splice(serverStates.server.indexOf(msg.guild.name), 1);
        }
        else {
            serverStates.server.push(msg.guild.name);
        }
        console.log(serverStates.server);
    }
    else {
        console.log('-> Not a command.');
    }
});
client.on('presenceUpdate', presence => {
    var _a;
    if (isActivated((_a = presence === null || presence === void 0 ? void 0 : presence.guild) === null || _a === void 0 ? void 0 : _a.name)) {
        const user = presence.user;
        const guild = presence.guild;
        if (!user)
            return;
        const member = guild === null || guild === void 0 ? void 0 : guild.member(user);
        const channels = guild === null || guild === void 0 ? void 0 : guild.channels;
        const channel = channels === null || channels === void 0 ? void 0 : channels.cache.map((chan) => {
            if (chan.name === 'Visual Studio Code') {
                return chan;
            }
            return null;
        });
        if (!channel) {
            console.log('no channel');
            return;
        }
        ;
        const fileteredChannel = channel.filter(obj => {
            return obj != null;
        });
        if (!fileteredChannel[0]) {
            console.log(fileteredChannel);
            return;
        }
        member === null || member === void 0 ? void 0 : member.voice.setChannel(fileteredChannel[0]);
        return;
    }
    return;
});
client.login(token);
//# sourceMappingURL=index.js.map