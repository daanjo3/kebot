const jsonTroops = require('./troops.json');

// Sums the total amount of troops
// TODO write a cleaner totalTroops method that doesn't produce strings
const totalTroops = (troopindexes) => {
    return [
        {
            unit: 'slingers',
            amount: troopindexes.map(index => index.slingers).reduce((total, num) => total + num),
        },
        {
            unit: 'hoplites',
            amount: troopindexes.map(index => index.hoplites).reduce((total, num) => total + num),
        },
        {
            unit: 'horsemen',
            amount: troopindexes.map(index => index.horses).reduce((total, num) => total + num),
        },
        {
            unit: 'catapults',
            amount: troopindexes.map(index => index.catapults).reduce((total, num) => total + num),
        },
        {
            unit: 'light ships',
            amount: troopindexes.map(index => index.ls).reduce((total, num) => total + num),
        },
        {
            unit: 'triremes',
            amount: troopindexes.map(index => index.triremes).reduce((total, num) => total + num),
        },
    ];
};

const playerPledges = (troopindex) => {
    return [
        { unit: getTroopByName('slingers'), amount: troopindex.slingers },
        { unit: getTroopByName('hoplites'), amount: troopindex.hoplites },
        { unit: getTroopByName('horsemen'), amount: troopindex.horses },
        { unit: getTroopByName('catapults'), amount: troopindex.catapults },
        { unit: getTroopByName('ls'), amount: troopindex.ls },
        { unit: getTroopByName('triremes'), amount: troopindex.triremes },
    ];
};

const participantsReducer = (acc, cur) => (!acc.includes(cur.userid) ? acc.concat(cur.userid) : acc);

const participants = (troopindexes) => troopindexes.reduce(participantsReducer, []);

class Troop {
    // Constructor for loading through json object
    constructor(obj) {
        this.name = obj.name;
        this.aliases = obj.aliases;
        this.type = obj.type;
    }

    hasTroopName(name) {
        return this.name === name || this.aliases.includes(name);
    }
}

const troops = jsonTroops.map(obj => new Troop(obj));

function isTroopName(unitname) {
    return troops.some(troop => troop.hasTroopName(unitname));
}

function getTroopByName(unitname) {
    for (const troop of troops) {
        if (troop.hasTroopName(unitname)) {
            return troop;
        }
    }
    return null;
}

module.exports.playerPledges = playerPledges;
module.exports.totalTroops = totalTroops;
module.exports.participants = participants;
module.exports.troops = troops;
module.exports.isTroopName = isTroopName;
module.exports.getTroopByName = getTroopByName;