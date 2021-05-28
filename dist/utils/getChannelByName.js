"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChannelByName = void 0;
const getRightName_1 = require("./getRightName");
const getChannelByName = (guild, channelName) => {
    const channels = guild === null || guild === void 0 ? void 0 : guild.channels.cache;
    let usedChannel;
    const rightChannel = getRightName_1.getRightName(guild, channelName);
    for (let channelKey of channels.keys()) {
        const channel = channels.get(channelKey);
        if ((channel === null || channel === void 0 ? void 0 : channel.name) === channelName) {
            usedChannel = channel;
        }
    }
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