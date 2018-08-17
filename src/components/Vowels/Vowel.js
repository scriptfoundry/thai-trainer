import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { PRONUNCIATIONTYPE_IPA } from '../../services/WordManager';
import PlayButton from '../common/PlayButton';

const Vowel = ({ vowel, pronunciationType, onNext, onPrev  }) => {
    return <Fragment>
        <button onClick={ () => onPrev(vowel) }>〈</button>
        <button onClick={ () => onNext(vowel) }>〉</button>
        <h1>{ vowel.vowel }</h1>
        <h2>{ pronunciationType === PRONUNCIATIONTYPE_IPA ? vowel.ipa : vowel.paiboon } <PlayButton word={{thai: vowel.vowel}} /></h2>
    </Fragment>;
};

Vowel.propTypes = {
    vowel: PropTypes.shape({
        vowel: PropTypes.string.isRequired,
        examples: PropTypes.arrayOf(PropTypes.string).isRequired,
        ipa: PropTypes.string.isRequired,
        paiboon: PropTypes.string.isRequired
    }).isRequired,
    pronunciationType: PropTypes.string.isRequired,
    onNext: PropTypes.func.isRequired,
    onPrev: PropTypes.func.isRequired,
};

export default Vowel;