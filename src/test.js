const formatConfigToObject = (raw) => {
    let result = "";
    const alone = raw.split(';').filter((element) => element ? element : null);
    result += '{';
    for (let rawOne of alone) {
        result += '"' + rawOne.split(':')[0] + '"' + ':' + '"' + rawOne.split(':')[1] + '"';
        if (alone.indexOf(rawOne) !== alone.length - 1) result += ',';
    }
    result += '}';
    return result;
};

const obj = JSON.parse(formatConfigToObject('VALORANT:Valorant;Visual Studio Code:vscode;Rocket League:rl;'));

console.log(obj["VALORANT"]);