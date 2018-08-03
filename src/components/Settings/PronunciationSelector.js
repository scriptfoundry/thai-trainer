import React from 'react';
import PropTypes from 'prop-types';
import { PRONUNCIATIONTYPE_IPA, PRONUNCIATIONTYPE_PAIBOON } from '../../services/WordManager';
import PronunciationSample from './PronunciationSample';

const goodWords = [
    'พจนานุกรม',
    'สูง',
    'แต่งงาน',
    'เนิ่นๆ',
    'ครัว',
    'ร้านอาหาร',
];
const PronunciationSelector = ({ changePronunciationType, pronunciationType, words, saySample }) => {
    const sampleWords = words
        .filter(({ thai }) => goodWords.find(goodWord => thai === goodWord))
        .map(word => <PronunciationSample key={ word.thai } word={ word } saySample={ saySample } />);

    return (<div className="voice-selector">
        <h1>Settings</h1>
        <h2>Displayed Pronunciation</h2>
        <p>This site supports two phonemic transcription systems, the <a href="https://en.wikipedia.org/wiki/International_Phonetic_Alphabet">International Phonemic Alphabet</a>, a standard system used commonly by linguists to transcribe virtually any human language, and the Paiboon system, developed by <a href="https://www.paiboonpublishing.com/">Paiboon Publishing</a>.</p>
         <p>Which should you use? That depends on you. It is important that you select a system that makes the most sense, or perhaps stick to the system you already have seen in other study books. But it probably is more important in the long run to use the same system consistently during your studies. Whichever system you pick, you will have to deal with unfamiliar symbols for all the discrete sounds found in spoken Thai. IPA is generally considered to be the most complete transcription system in common use. Paiboon, on the other hand, is more popular in print and on the Internet.</p>
         <p>You are currently set up to use { pronunciationType }</p>
        <div>
            <div>
                <div className="sample">
                    <div><button disabled={ pronunciationType===PRONUNCIATIONTYPE_IPA} onClick={ () => changePronunciationType(PRONUNCIATIONTYPE_IPA)}>Use I.P.A.</button></div>
                    <div></div>
                    <div><button disabled={ pronunciationType===PRONUNCIATIONTYPE_PAIBOON} onClick={ () => changePronunciationType(PRONUNCIATIONTYPE_PAIBOON)}>Use Paiboon</button></div>
                </div>
                { sampleWords }
            </div>
        </div>
    </div>);
};

PronunciationSelector.propTypes = {
    pronunciationType: PropTypes.oneOf([ PRONUNCIATIONTYPE_IPA, PRONUNCIATIONTYPE_PAIBOON ]).isRequired,
    changePronunciationType: PropTypes.func.isRequired,
    words: PropTypes.array.isRequired,
    saySample: PropTypes.func.isRequired,
};

export default PronunciationSelector;