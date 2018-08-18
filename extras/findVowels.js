const fs = require('fs');
const path = require('path');

const filename = 'sea-freq.txt';

const rxHasSpace = /\s/;
const byLength = (a, b) => a.length > b.length ? 1 : -1;
const getWords = () => new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, filename), 'utf8', (err, data) => {
        if (err) return reject(err);
        resolve(data.toString().split(/\s*\n\s*/).filter(line => rxHasSpace.test(line) === false));
    });
});

const getVowels = () => new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, 'vowelList.txt'), (err, data) => {
        if (err) return reject(err);
        const vowels = data
            .toString()
            .split(/\s*\n\s*/)
            .map(text => ({ text, rx: new RegExp(text.replace('อ', '.+')) }));
        resolve(vowels);
    });
});
const writeResults = hits => new Promise((resolve, reject) => {
    fs.writeFile(path.join(__dirname, 'vowels-with-examples.txt'), hits.map(({text, matches}) => `${text}\t${matches.join(', ')}`).join('\n'), (err) => {
        if (err) return reject(err);
    });
});
const run = async () => {
    try {
        let words = await getWords();
        let vowels = await getVowels();
        const hits = vowels.map(({text, rx}) => ({ text, rx, matches: words.filter(word => rx.test(word) ).sort(byLength).slice(0,10) }));
        await writeResults(hits);
    } catch (err) {
        console.log(err); // eslint-disable-line no-console
    }
};
run();