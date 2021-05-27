"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isActivated = void 0;
const index_1 = require("../index");
const isActivated = (serverName) => {
    console.log(index_1.serverStates);
    if (typeof serverName === 'undefined') {
        return false;
    }
    if (index_1.serverStates.server.includes(serverName)) {
        return true;
    }
    return false;
};
exports.isActivated = isActivated;
//# sourceMappingURL=isActivated.js.map