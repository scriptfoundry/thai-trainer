import React from 'react';
import PropTypes from 'prop-types';
import { PRONUNCIATIONTYPE_IPA, PRONUNCIATIONTYPE_PAIBOON } from '../../services/WordManager';
import PlayButton from '../common/PlayButton';
import ProgressIcon from '../common/ProgressIcon';

const getPronunciation = (ipa, paiboon, pronunciationType) => pronunciationType === PRONUNCIATIONTYPE_IPA ? ipa : paiboon;

const ProgressItem = ({ word, pronunciationType, showProgress }) => {
    const { term, thai, ipa, paiboon, aspectScores=[0, 0, 0] } = word;
    const progressIcons = aspectScores.map((score, index) => <ProgressIcon key={index} progress={ score / 5 } /> );

    return <tr>
        <td>{ term }</td>
        <td>{ thai }</td>
        <td><PlayButton word={word} /> { getPronunciation(ipa, paiboon, pronunciationType) }</td>
        { showProgress ? <td className="progress-icons">{ progressIcons }</td> : null }
    </tr>;
};

ProgressItem.propTypes = {
    word: PropTypes.shape({
        id: PropTypes.number.isRequired,
        section: PropTypes.string.isRequired,
        term: PropTypes.string.isRequired,
        thai: PropTypes.string.isRequired,
        ipa: PropTypes.string.isRequired,
        paiboon: PropTypes.string.isRequired,
        aspectScores: PropTypes.arrayOf(PropTypes.number).isRequired,
    }),
    pronunciationType: PropTypes.oneOf([ PRONUNCIATIONTYPE_IPA, PRONUNCIATIONTYPE_PAIBOON]),
    showProgress: PropTypes.bool.isRequired,
};

export default ProgressItem;