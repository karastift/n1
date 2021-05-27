import { Client } from "discord.js";
import { ServerStates } from "./types";

const client = new Client();
const token = 'ODAzMzQ1NTg0ODI3NTMxMjY0.YA8b4A.hYui2lNV02L6sA_f-goSR1nDfKM';

let serverStates: ServerStates = {
    server: [""],
}

const isActivated = (serverName: string | undefined) => {
    if (typeof serverName === 'undefined') {
        return false;
    }
    if (serverStates.server.includes(serverName)) {
        return true;
    }
    return false;
};

client.on('ready', () => {
    console.log(`Logged in as ${client.user!.tag}!`)
});

client.on('message', msg => {
    if (msg.content == '>Hello') {
        msg.channel.send('World!');
    }
    else if (msg.content == 'toggle') {
        if (isActivated(msg.guild!.name)) {
            serverStates.server.splice(serverStates.server.indexOf(msg.guild!.name), 1);
        }
        else {
            serverStates.server.push(msg.guild!.name);
        }
        console.log(serverStates.server);
    }
    
    else {console.log('-> Not a command.')}
});
client.on('presenceUpdate', presence => {
    if (isActivated(presence?.guild?.name)) {
        const user = presence!.user;
        // const activity = user!.presence.activities[0]?.name;
        const guild = presence!.guild;

        if (!user) return
        const member = guild?.member(user);




        const channels = guild?.channels;
        const channel = channels?.cache.map((chan) => {
            if (chan.name === 'Visual Studio Code') {
                return chan;
            }
            return null;
        });

        if (!channel) {
            console.log('no channel');
            return;
        };
        const fileteredChannel = channel.filter( obj => {
                return obj != null;
            });



        
        if (!fileteredChannel[0]) {
            console.log(fileteredChannel);
            return;
        }

        member?.voice.setChannel(fileteredChannel[0]);

        return
    }
    return
});

client.login(token);