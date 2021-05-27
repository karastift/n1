"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChannelByName = void 0;
const fs_1 = __importDefault(require("fs"));
const getRightName = (guild, channelName) => {
    const configFile = fs_1.default.readFileSync('./src/serverConfigurations.json', 'utf8');
    const configArray = JSON.parse(configFile).serverConfigurationObjects;
    for (let obj of configArray) {
        if (obj.serverName === guild.name) {
            if (Object.keys(obj.config).includes(channelName)) {
                const map = new Map(Object.entries(obj.config));
                const newName = map.get(channelName);
                for (let channelKey of guild.channels.cache.keys()) {
                    const channel = guild.channels.cache.get(channelKey);
                    if ((channel === null || channel === void 0 ? void 0 : channel.name) === newName) {
                        console.log('arrived');
                        return channel;
                    }
                }
            }
        }
    }
    return null;
};
const getChannelByName = (guild, channelName) => {
    const channels = guild === null || guild === void 0 ? void 0 : guild.channels.cache;
    let usedChannel;
    const rightChannel = getRightName(guild, channelName);
    for (let channelKey of channels.keys()) {
        const channel = channels.get(channelKey);
        if ((channel === null || channel === void 0 ? void 0 : channel.name) === channelName) {
            usedChannel = channel;
        }
    }
    return rightChannel;
    if (typeof (rightChannel === null || rightChannel === void 0 ? void 0 : rightChannel.client) !== 'undefined') {
        console.log('left');
        return rightChannel;
    }
    else if (typeof usedChannel.client !== 'undefined') {
        console.log('right');
        return usedChannel;
    }
    return null;
};
exports.getChannelByName = getChannelByName;
//# sourceMappingURL=getChannelByName.js.map