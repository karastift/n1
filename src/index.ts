import { Client } from "discord.js";
import { ServerStates } from "./types";
import { token, prefix } from "./config.json";
import { isActivated } from "./utils/isActivated";
import { getChannelByName } from "./utils/getChannelByName";

const client = new Client();
export let serverStates: ServerStates = {
    server: [],
};

client.on('ready', () => {    
    console.log(`Logged in as ${client.user!.tag}!`)
});

client.on('message', msg => {
    
    if (msg.content == prefix + 'Hello') {
        msg.channel.send('World!');
    }
    else if (msg.content == prefix + 'toggle') {
        if (isActivated(msg.guild!.name)) {
            serverStates.server.splice(serverStates.server.indexOf(msg.guild!.name), 1);
        }
        else {
            serverStates.server.push(msg.guild!.name);
        }

    }
});

client.on('presenceUpdate', presence => {
    if (isActivated(presence?.guild?.name)) {
        const user = presence!.user;
        const activity = user!.presence.activities[0]?.name;
        const guild = presence!.guild;
        if (!user || !guild) return;

        const channel = getChannelByName(guild, activity);
        if (!channel) return;

        const member = guild?.member(user);

        member?.voice.setChannel(channel);
    }
});

client.login(token);
