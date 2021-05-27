"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChannelByName = void 0;
const getChannelByName = (guild, channelName) => {
    const channels = guild === null || guild === void 0 ? void 0 : guild.channels.cache;
    for (let channelKey of channels.keys()) {
        const channel = channels.get(channelKey);
        if ((channel === null || channel === void 0 ? void 0 : channel.name) === channelName) {
            return channel;
        }
    }
    return null;
};
exports.getChannelByName = getChannelByName;
//# sourceMappingURL=getChannelByName.js.map