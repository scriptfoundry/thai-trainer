const fs = require('fs');
const path = require('path');

const consonantsFilePath = path.join(__dirname,'../public/data/consonants.json');
const lexFilePath = path.join(__dirname, 'sea-freq.txt');

const loadConsonantsFile = () => new Promise((resolve, reject) => fs.readFile(consonantsFilePath, 'utf8', (err, data) => {
    if (err) reject(err);
    else resolve(JSON.parse(data.toString()));
}));
const loadLexFile = () => new Promise((resolve, reject) => fs.readFile(lexFilePath, 'utf8', (err, data) => {
    if (err) reject(err);
    else resolve(data.toString().split(/\n/));
}));

const getConsonantKeys = (consonants, keys) => { //eslint-disable-line no-unused-vars
    const keyNames = Object.keys(keys);

    return Object.keys(consonants).reduce((current, consonant) => {
        let [x, y] = consonants[consonant];
        let key = keyNames.find((name) => {
            let [a, b] = keys[name];
            return (a === x || a === null) && (b === y || b === null);
        }) || 'other';
        if (!current[key]) current[key] = [];
        current[key].push(consonant);
        return current;
    }, {});
};

const getSamples = (character, samples) => {
    return samples
        .filter(sample => sample.indexOf(character) > -1)
        .sort((a, b) => a.length > b.length ? 1 : -1)
        .slice(0, 10);
};

const run = async () => {
    try {
        const { consonants, keys, confusion } = await loadConsonantsFile();
        const samples = await loadLexFile();
        Object.keys(consonants).forEach(consonant => console.log(getSamples(consonant, samples))); // eslint-disable-line

        console.log(words) // eslint-disable-line
        console.log(getConsonantKeys(consonants, keys)); // eslint-disable-line
        console.log(consonants, keys, confusion); // eslint-disable-line
    } catch (err) {
        console.log(err); // eslint-disable-line
    }
};

run();