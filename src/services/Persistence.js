import localforage from 'localforage';

export const init = () => {
    localforage.config({
        name: 'thai2',
        storeName: 'persistentStore',
        description: 'Persistent store for settings and progress for Spoken Thai Flashcards'
    });
};

export const loadWords = async () => {
    let response = await fetch('/data/allwords.json');
    let words = await response.json();
    return words;
};

export const loadVowels = async () => {
    let response = await fetch('/data/vowels.json');
    let vowels = await response.json();
    return vowels;
};
export const loadProgressData = async () => {
    const progress = await localforage.getItem('progress');
    return progress || [];
};

export const saveProgressData = async (progress) => {
    await localforage.setItem('progress', progress);
};

export const loadVoices = async () => {
    const voiceSettings = await localforage.getItem('voiceSettings');
    let { englishVoiceName = null, thaiVoiceName = null, rate = 1 } = voiceSettings || {};
    return { englishVoiceName, thaiVoiceName, rate };
};

export const saveVoices = async (voiceSettings) => {
    await localforage.setItem('voiceSettings', voiceSettings);
};

export const loadSettings = async () => {
    let settings = await localforage.getItem('settings');
    let { pronunciationType, practiceWordLimit, testingWordLimit, practiceOrder, practiceAllAtOnce } = settings || {};
    return { pronunciationType, practiceWordLimit, testingWordLimit, practiceOrder, practiceAllAtOnce };
};

export const saveSettings = async (settings) => {
    let existingSettings = await localforage.getItem('settings');
    await localforage.setItem('settings', { ...existingSettings, ...settings });
};