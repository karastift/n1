import { prefix } from "../config.json";

export const convertMessage = (message: string) => {
    const args = message.slice(prefix.length).trim().split(' ');
    const command = args.shift()?.toLowerCase();
    return { args, command };
};
