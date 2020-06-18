// Sums the total amount of troops
// TODO replace to own troop arithmetic module (!!!)
function totalTroops(troopindexes) {
    const data = [];
    data.push(`slingers: ${troopindexes.map(index => index.slingers).reduce((total, num) => total + num)}`);
    data.push(`hoplites: ${troopindexes.map(index => index.hoplites).reduce((total, num) => total + num)}`);
    data.push(`horses: ${troopindexes.map(index => index.horses).reduce((total, num) => total + num)}`);
    data.push(`catapults: ${troopindexes.map(index => index.catapults).reduce((total, num) => total + num)}`);
    data.push(`ls: ${troopindexes.map(index => index.ls).reduce((total, num) => total + num)}`);
    data.push(`triremes: ${troopindexes.map(index => index.triremes).reduce((total, num) => total + num)}`);
    return data;
}

module.exports.totalTroops = totalTroops;

// TODO replace for a troopcount command
function playerPledges(troopindex) {
    const data = [];
    data.push(`${troopindex.username} enlisted the following troops:`);
    if (troopindex.slingers != 0) data.push(`slingers: ${troopindex.slingers}`);
    if (troopindex.hoplites != 0) data.push(`hoplites: ${troopindex.hoplites}`);
    if (troopindex.horses != 0) data.push(`horses: ${troopindex.horses}`);
    if (troopindex.catapults != 0) data.push(`catapults: ${troopindex.catapults}`);
    if (troopindex.ls != 0) data.push(`ls: ${troopindex.ls}`);
    if (troopindex.triremes != 0) data.push(`triremes: ${troopindex.triremes}`);
    return data;
}

module.exports.playerPledges = playerPledges;