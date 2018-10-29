import React from 'react';
import PropTypes from 'prop-types';
import { PRONUNCIATIONTYPE_IPA, PRONUNCIATIONTYPE_PAIBOON } from '../../services/WordManager';
import PronunciationSample from './PronunciationSample';

const goodWords = [
    'สร้าง',
    'เฮ้อ',
    'จริต',
    'กีฬา',
    'การเมือง',
    'ปกครอง',
];
const makeClickableHeader = (label, onClick, isDisabled) => isDisabled ? <button className="disabled-button">{label}</button> : <button onClick={ onClick }>{label}</button>;
const PronunciationSelector = ({ changePronunciationType, pronunciationType, words }) => {
    const sampleWords =
        goodWords.map(thai => words.find(word => word.thai === thai))
        .map(word => <PronunciationSample key={ word.thai } word={ word } />);

    const samplesClassName = pronunciationType === PRONUNCIATIONTYPE_PAIBOON ? 'samples paiboon' : 'samples ipa';
    return (<div className="voice-selector">
        <h2>Displayed Pronunciation</h2>
        <p>The goal of this entire site is for you to be able to read without any intermediate transcription system.</p>
        <p>But to get you there, this site supports two popular phonemic transcription systems: the <a href="https://en.wikipedia.org/wiki/International_Phonetic_Alphabet">International Phonemic Alphabet</a>, a standard system used commonly by linguists to transcribe virtually any human language; and the Paiboon system, developed by <a href="https://www.paiboonpublishing.com/">Paiboon Publishing</a>.</p>
        <p>Which should you use? That depends on you. IPA is generally considered to be the most complete transcription system in common use. Paiboon, on the other hand, is more popular in print and on the Internet. But it is more important that you select a system that makes the most sense to you. Or perhaps stick to the system you already have seen in other study books. No matter which system you pick, you have to prepare yourself to deal with unfamiliar symbols for Thai&apos;s many unfamiliar sounds.</p>
        <p>Still not sure? Listen to a few of the sample words below and then look at how the two systems transcribe these words. Then select the system that makes greatest sense to you.</p>

        <div className={ samplesClassName }>
            <div className="sample">
                <div>{ makeClickableHeader('Use I.P.A.', () => changePronunciationType(PRONUNCIATIONTYPE_IPA), pronunciationType === PRONUNCIATIONTYPE_IPA) }</div>
                <div></div>
                <div>{ makeClickableHeader('Use Paiboon', () => changePronunciationType(PRONUNCIATIONTYPE_PAIBOON), pronunciationType === PRONUNCIATIONTYPE_PAIBOON) }</div>
            </div>
            { sampleWords }
        </div>
    </div>);
};

PronunciationSelector.propTypes = {
    pronunciationType: PropTypes.oneOf([ PRONUNCIATIONTYPE_IPA, PRONUNCIATIONTYPE_PAIBOON ]).isRequired,
    changePronunciationType: PropTypes.func.isRequired,
    words: PropTypes.array.isRequired,
};

export default PronunciationSelector;