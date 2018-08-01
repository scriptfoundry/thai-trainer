import React from 'react';
import PropTypes from 'prop-types';
import { PRONUNCIATIONTYPE_PAIBOON } from '../../services/WordManager';

const Card = ({ word: { term, thai, ipa, paiboon }, pronunciationType, stage }) => <div>
    <div>{ term }</div>
    <div>{ thai }</div>
    <div>{ pronunciationType === PRONUNCIATIONTYPE_PAIBOON ? paiboon : ipa }</div>
</div>;

Card.propTypes = {
    word: PropTypes.shape({
        term: PropTypes.string.isRequired,
        thai: PropTypes.string.isRequired,
        ipa: PropTypes.string.isRequired,
        paiboon: PropTypes.string.isRequired,
    }).isRequired,
    pronunciationType: PropTypes.string.isRequired,
    stage: PropTypes.number.isRequired,
};

export default Card;