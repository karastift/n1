import { Guild, GuildChannel } from "discord.js";

export const getChannelByName = (guild: Guild, channelName: string): GuildChannel | null => {
    const channels = guild?.channels.cache;

    for (let channelKey of channels.keys()) {
        const channel = channels.get(channelKey);
        if (channel?.name === channelName) {
            return channel;
        }
    }
    return null;
};
