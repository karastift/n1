import { User } from "discord.js";

export const noArgsMessage = (author: User) => `You didn't provide any arguments. Possible options are \`start\` or \`stop\` or \`configure\`. Better luck next time ${author}!`;

export const alreadyActiveMessage = 'I am already active and I am trying my best to move you guys in the right channels...';

export const startedMessage = 'From now on I will pay much attention on the games you play and I will try to move you in the right voice channels.';

export const alreadyStoppedMessage = 'I am not even paying attention to your presences right now.';

export const stoppedMessage = 'Alright I am going to rest now.';

export const notDeveloped = 'Sorry, this feature is not currently developed.';

export const wrongArgMessage = (args: string[]) => `Are you sure that you typed \`${args[0]}\` right? I just cannot figure out what to do with this argument.`;

export const wrongCommandMessage = (command: string) => `I am sorry but I do not know what \`${command}\` means.`;