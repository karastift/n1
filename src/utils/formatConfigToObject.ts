export const formatConfigToObject = (raw: string) => {
    let result = "";
    try {
        const alone = raw.split(';').filter((element) => element ? element : null);
        result += '{';
        for (let rawOne of alone) {
            result += '"' + rawOne.split(':')[0] + '"' + ':' + '"' + rawOne.split(':')[1] + '"';
            if (alone.indexOf(rawOne) !== alone.length - 1)
                result += ',';
        }
        result += '}';
        return JSON.parse(result);
    }
    catch (e) {
        return null;
    }
};
