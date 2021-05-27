"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverStates = void 0;
const discord_js_1 = require("discord.js");
const config_json_1 = require("./config.json");
const isActivated_1 = require("./utils/isActivated");
const getChannelByName_1 = require("./utils/getChannelByName");
const client = new discord_js_1.Client();
exports.serverStates = {
    server: [],
};
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
client.on('message', msg => {
    if (msg.content == config_json_1.prefix + 'Hello') {
        msg.channel.send('World!');
    }
    else if (msg.content == config_json_1.prefix + 'toggle') {
        if (isActivated_1.isActivated(msg.guild.name)) {
            exports.serverStates.server.splice(exports.serverStates.server.indexOf(msg.guild.name), 1);
        }
        else {
            exports.serverStates.server.push(msg.guild.name);
        }
        console.log(exports.serverStates.server);
    }
});
client.on('presenceUpdate', presence => {
    var _a, _b;
    if (isActivated_1.isActivated((_a = presence === null || presence === void 0 ? void 0 : presence.guild) === null || _a === void 0 ? void 0 : _a.name)) {
        const user = presence.user;
        const activity = (_b = user.presence.activities[0]) === null || _b === void 0 ? void 0 : _b.name;
        const guild = presence.guild;
        if (!user || !guild)
            return;
        const channel = getChannelByName_1.getChannelByName(guild, activity);
        if (!channel)
            return;
        const member = guild === null || guild === void 0 ? void 0 : guild.member(user);
        member === null || member === void 0 ? void 0 : member.voice.setChannel(channel);
    }
});
client.login(config_json_1.token);
//# sourceMappingURL=index.js.map