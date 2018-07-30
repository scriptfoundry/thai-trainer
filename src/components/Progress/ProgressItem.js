import React from 'react';
import PropTypes from 'prop-types';
import { PRONUNCIATIONTYPE_IPA, PRONUNCIATIONTYPE_PAIBOON } from '../../services/WordManager';
import PlayButton from '../common/PlayButton';
import ProgressIcon from '../common/ProgressIcon';

const getPronunciation = (ipa, paiboon, pronunciationType) => pronunciationType === PRONUNCIATIONTYPE_IPA ? ipa : paiboon;

const ProgressItem = ({ word, pronunciationType }) => {
    const { term, thai, ipa, paiboon, scores } = word;
    const progressIcons = scores ? scores.map((score, index) => <ProgressIcon key={index} progress={ score / 5 } /> ) : null;

    return <div>
        <div>{ thai }</div>
        <div>{ term }</div>
        <div>{ getPronunciation(ipa, paiboon, pronunciationType) }</div>
        <div><PlayButton word={word} /></div>
        <div className="progress-icons">
            { progressIcons }
        </div>
    </div>;
};

ProgressItem.propTypes = {
    word: PropTypes.shape({
        id: PropTypes.number.isRequired,
        section: PropTypes.string.isRequired,
        term: PropTypes.string.isRequired,
        thai: PropTypes.string.isRequired,
        ipa: PropTypes.string.isRequired,
        paiboon: PropTypes.string.isRequired,
    }),
    pronunciationType: PropTypes.oneOf([ PRONUNCIATIONTYPE_IPA, PRONUNCIATIONTYPE_PAIBOON])
};

export default ProgressItem;