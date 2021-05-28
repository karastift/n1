import { Client, Guild, Presence, User } from "discord.js";
import { prefix, token } from "./config.json";
import { ServerStates } from "./types";
import { convertMessage } from "./utils/convertMessage";
import { formatConfigToObject } from "./utils/formatConfigToObject";
import { isActivated } from "./utils/isActivated";
import {
    alreadyActiveMessage,
    alreadyStoppedMessage,
    noArgsMessage,
    notDeveloped,
    startedMessage,
    stoppedMessage,
    wrongArgMessage,
    wrongCommandMessage
} from "./utils/messages";

const client = new Client();
export let serverStates: ServerStates = {
    server: ['BotTesting'],
};

const validToMove = (user: User | null, guild: Guild | null, newPresence: Presence | null) => {
    if (
        !user || 
        !guild || 
        newPresence?.status === 'offline' ||
        newPresence?.status === 'invisible'
    ) return false;
    return true;
}

client.on('ready', () => {    
    console.log(`Logged in as ${client.user!.tag}!`);
    client.user?.setActivity(`Currently not moving any users.`);
});

client.on('message', msg => {
   
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

	const { command, args } = convertMessage(msg.content);

    if (command === 'moving') {
        client.user?.setActivity(`Currently moving users on ${serverStates.server.length} servers.`);
		if (!args.length) {
			return msg.channel.send(noArgsMessage(msg.author));
		}
        else if (args[0] === 'start') {
            if (isActivated(msg.guild!.name)) {
                return msg.channel.send(alreadyActiveMessage);
            }
            else {
                serverStates.server.push(msg.guild!.name);
                return msg.channel.send(startedMessage);
            }
        }
        else if (args[0] === 'stop') {
            if (!isActivated(msg.guild!.name)) {
                return msg.channel.send(alreadyStoppedMessage);
            }
            else {
                serverStates.server.splice(serverStates.server.indexOf(msg.guild!.name), 1);
                return msg.channel.send(stoppedMessage);
            }
        }
        else if (args[0] === 'status') {
            return msg.channel.send(isActivated(msg.guild!.name) ? 'I am active.' : 'I am not active.');
        }
        else if (args[0] === 'configure') {
            return msg.channel.send(notDeveloped);
            const pattern = args[0];
            const rawConfig = msg.content.slice(msg.content.indexOf(pattern) + pattern.length);
            const newConfig = formatConfigToObject(rawConfig);
            return msg.channel.send('Configured new. ' + JSON.stringify(newConfig));
        }
        console.log(serverStates.server);
        return msg.channel.send(wrongArgMessage(args));
	}
    return msg.channel.send(wrongCommandMessage(command!));
});

client.on('presenceUpdate', presence => {
    if (isActivated(presence?.guild?.name)) {
        const user = presence!.user;
        const newPresence = user!.presence;
        const activity = user!.presence.activities[0].name;
        const guild = presence!.guild;

        if (!validToMove(user, guild, newPresence)) return;

        const channel = guild?.channels.cache.find(channel => channel.name.toLowerCase() === activity.toLowerCase());
        
        if (!channel) return;

        const member = guild?.member(user!);

        if (!member?.voice.channel) return;

        member?.voice.setChannel(channel);
    }
});

client.login(token);
