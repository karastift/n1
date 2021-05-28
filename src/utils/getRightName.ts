import { Guild, GuildChannel } from "discord.js";
import fs from "fs";

export const getRightName = (guild: Guild, channelName: string): GuildChannel | null => {
    const configFile = fs.readFileSync('./src/serverConfigurations.json', 'utf8');
    const configArray = JSON.parse(configFile).serverConfigurationObjects;

    for (let obj of configArray) {

        if (obj.serverName.toLowerCase() === guild.name.toLowerCase()) {

            if (Object.keys(obj.config).includes(channelName)) {

                const map = new Map(Object.entries(obj.config));
                const newName = map.get(channelName);

                for (let channelKey of guild.channels.cache.keys()) {
                    const channel = guild.channels.cache.get(channelKey);
                    
                    if (channel?.name === newName) {
                        console.log('arrived');
                        console.log(channel?.name);
                        return channel!;
                    }
                }
            }
        }
    }
    return null;
};
