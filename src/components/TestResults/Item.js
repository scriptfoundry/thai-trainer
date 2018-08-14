import React from 'react';
import PropTypes from 'prop-types';
import { PRONUNCIATIONTYPE_IPA } from '../../services/WordManager';
import Score from './Score';

const Item = ({ word, aspectScores, pronunciationType }) => {
    return <div className="result">
        <div><Score index={0} scores={ aspectScores } />{word.term}</div>
        <div><Score index={1} scores={ aspectScores } /> { pronunciationType === PRONUNCIATIONTYPE_IPA ? word.ipa : word.paiboon }</div>
        <div><Score index={2} scores={ aspectScores } /> {word.thai}</div>
    </div>;
};

Item.propTypes = {
    aspectScores: PropTypes.array.isRequired,
    word: PropTypes.object.isRequired,
    pronunciationType: PropTypes.oneOf(['IPA', 'Paiboon']).isRequired,
};

export default Item;