import { Guild, GuildChannel } from "discord.js";
import { getRightName } from "./getRightName";

export const getChannelByName = (guild: Guild, channelName: string): GuildChannel | null => {
    const channels = guild?.channels.cache;
    let usedChannel: GuildChannel;
    const rightChannel = getRightName(guild, channelName);
    for (let channelKey of channels.keys()) {
        const channel = channels.get(channelKey);
        if (channel?.name === channelName) {
            usedChannel = channel;
        }
    }
    if (typeof rightChannel?.client !== 'undefined') {
        console.log('left')
        return rightChannel;
    }
    else if (typeof usedChannel!.client !== 'undefined') {
        console.log('right')
        return usedChannel!;
    }
    return null;
};
