import { Client } from "discord.js";
import { ServerStates } from "./types";
import { token, prefix } from "./config.json";
import { isActivated } from "./utils/isActivated";
import { getChannelByName } from "./utils/getChannelByName";

const client = new Client();
export let serverStates: ServerStates = {
    server: ['BotTesting'],
};

client.on('ready', () => {    
    console.log(`Logged in as ${client.user!.tag}!`)
});

client.on('message', msg => {
   
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

	const args = msg.content.slice(prefix.length).trim().split('/ +/');
	const command = args.shift()?.toLowerCase();

    if (command === 'moving') {
		if (!args.length) {
			return msg.channel.send(`You didn't provide any arguments. Possible options are \`start\` or \`stop\` or \`configure\`. Better luck next time ${msg.author}!`);
		}
        else if (args[0] === 'start') {
            if (isActivated(msg.guild!.name)) {
                return msg.channel.send('I am already active and I am trying my best to move you guys in the right channels...');
            }
            else {
                serverStates.server.push(msg.guild!.name);
                return msg.channel.send('From now on I will pay much attention on the games you play and I will try to move you in the right voice channels.');
            }
        }
        else if (args[0] === 'stop') {
            if (!isActivated(msg.guild!.name)) {
                return msg.channel.send('I am not even paying attention to your presences right now.');
            }
            else {
                serverStates.server.splice(serverStates.server.indexOf(msg.guild!.name), 1);
                return msg.channel.send('Alright I am going to rest now.');
            }
        }
        else if (args[0] === 'configure') {
            const newConfig = args[1];
            // continue configure method
        }
        console.log(serverStates.server);
        return msg.channel.send(`Are you sure that you typed \`${args[0]}\` right? I just cannot figure out what to do with this argument.`);
	}
    return msg.channel.send(`I am sorry but I do not know what \`${command}\` means.`);
});

client.on('presenceUpdate', presence => {
    if (isActivated(presence?.guild?.name)) {
        const user = presence!.user;
        const newPresence = user!.presence;
        const activity = user!.presence.activities[0]?.name;
        const guild = presence!.guild;

        if (
            !user || 
            !guild || 
            newPresence.status === 'offline' ||
            newPresence.status === 'invisible' 
        ) return;

        const channel = getChannelByName(guild, activity);
        if (!channel) return;

        const member = guild?.member(user);

        if (!member?.voice.channel) return;

        member?.voice.setChannel(channel);
    }
});

client.login(token);
