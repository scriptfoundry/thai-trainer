import React from 'react';
import PropTypes from 'prop-types';
import Score from './Score';

const Item = ({ word, aspectScores }) => {
    return <div className="result">
        <div>{word.thai}</div>
        <div><Score index={0} scores={ aspectScores } /></div>
        <div><Score index={1} scores={ aspectScores } /></div>
    </div>;
};

Item.propTypes = {
    aspectScores: PropTypes.array.isRequired,
    word: PropTypes.object.isRequired,
};

export default Item;