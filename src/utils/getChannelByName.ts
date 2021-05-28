import { Guild, GuildChannel } from "discord.js";
import { getRightName } from "./getRightName";

export const getChannelByName = (guild: Guild, channelName: string): GuildChannel | null => {
    const channels = guild?.channels.cache;

    const rightChannel = getRightName(guild, channelName);

    for (let channelKey of channels.keys()) {
        const channel = channels.get(channelKey);

        if (channel?.name === channelName) {
            console.log('returned original channel');
            return channel;
        }
    }

    if (typeof rightChannel?.client !== 'undefined') {
        console.log('left')
        return rightChannel;
    }

    return null;
};
