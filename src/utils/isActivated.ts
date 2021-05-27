import { serverStates } from "../index";

export const isActivated = (serverName: string | undefined) => {

    if (typeof serverName === 'undefined') {
        return false;
    }
    if (serverStates.server.includes(serverName)) {
        return true;
    }
    return false;
};
