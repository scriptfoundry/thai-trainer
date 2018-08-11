import React from 'react';
import PropTypes from 'prop-types';
import { PRONUNCIATIONTYPE_IPA } from '../../services/WordManager';
import Score from './Score';

const Item = ({ word, aspectScores, pronunciationType }) => {
    return <div className="result">
        <div>{word.term} <Score index={1} scores={ aspectScores } /></div>
        <div>{ pronunciationType === PRONUNCIATIONTYPE_IPA ? word.ipa : word.paiboon } <Score index={1} scores={ aspectScores } /></div>
        <div>{word.thai} <Score index={2} scores={ aspectScores } /></div>
    </div>;
};

Item.propTypes = {
    aspectScores: PropTypes.array.isRequired,
    word: PropTypes.object.isRequired,
    pronunciationType: PropTypes.oneOf(['IPA', 'Paiboon']).isRequired,
};

export default Item;