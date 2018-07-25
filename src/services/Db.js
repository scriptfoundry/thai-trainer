const DB_NAME = 'speakingflashcards';
const DB_VERSION = 1;

export const STATUS_ACTIVE = 0;
export const STATUS_NONE = 1;
export const STATUS_MASTERED = 2;
export const STATUS_MEMORIZED = 3;
export const STATUS_HIDDEN = 4;

const isAvailable = (status) => status !== STATUS_MEMORIZED && status !== STATUS_HIDDEN;

const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
let db;

export const init = () => new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onerror = err => reject(err);
    req.onsuccess = evt => {
        db = evt.target.result;
        resolve(db);
    };

    /* {
        key: 'abcdefg',
        status: 1,
        lastseen: 123456789012,
        timesseen: 3
    } */

    req.onupgradeneeded = evt => {
        var wordStore = evt.target.result.createObjectStore('words');
        wordStore.createIndex('status, lastseen', ['status', 'lastseen']);
        wordStore.createIndex('status', 'status', { unique: false });
        wordStore.createIndex('lastseen', 'lastseen', { unique: false });
        wordStore.createIndex('timesseen', 'timesseen', { unique: false });
    };
});

export const setWords = (words) => new Promise((resolve, reject) => {
    const transaction = db.transaction(['words'], 'readwrite');
    const wordStore = transaction.objectStore('words');

    words.forEach(({ key, status, timesseen, lastseen }) => {
        wordStore.put({ status, timesseen, lastseen }, key);
    });

    wordStore.onerror = () => reject(new Error('cannot set words'));

    wordStore.onsuccess = () => {
        resolve();
    };
});

export const getWords = (limit) => new Promise((resolve, reject) => {
    const transaction = db.transaction(['words']);
    const wordStore = transaction.objectStore('words');
    let words = [];
    wordStore.index('status, lastseen').openCursor = (evt) => {
        const cursor = evt.target.result;

        if (cursor) {
            let { value } = cursor;
            let { key, lastseen, timesseen, status } = value;

            if (words.length < limit && isAvailable(status)) {
                words.push(value);
            }

            cursor.continue();
        } else {
            resolve(words);
        }
    };
});