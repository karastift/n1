import { Guild, GuildChannel } from "discord.js";
import fs from "fs";

const getRightName = (guild: Guild, channelName: string): GuildChannel | null => {
    const configFile = fs.readFileSync('./src/serverConfigurations.json', 'utf8');
    const configArray = JSON.parse(configFile).serverConfigurationObjects;
    for (let obj of configArray) {
        if (obj.serverName === guild.name) {
            if (Object.keys(obj.config).includes(channelName)) {
                const map = new Map(Object.entries(obj.config));
                const newName = map.get(channelName);
                for (let channelKey of guild.channels.cache.keys()) {
                    const channel = guild.channels.cache.get(channelKey);
                    if (channel?.name === newName) {
                        console.log('arrived');
                        // console.log(channel);
                        return channel!;
                    }
                }
            }
        }
    }
    return null;
};

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
    return rightChannel!;
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
