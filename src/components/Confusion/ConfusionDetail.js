import React from 'react';
import PropTypes from 'prop-types';
import { PRONUNCIATIONTYPE_IPA, PRONUNCIATIONTYPE_PAIBOON } from '../../services/WordManager';
import PlayButton from '../common/PlayButton';

const ConfusionDetail = ({confusions, visibleConfusion, consonants, pronunciationType }) => {
    const confusedConsonants = confusions[visibleConfusion]
        .map(character => ({ character, consonants: consonants[character]}))
        .map((({character, consonants: [,,ipa,paiboon,thai]}) => <div key={ character }>
            <span>{ character }</span>
            <span>{ pronunciationType === PRONUNCIATIONTYPE_IPA ? ipa : paiboon }</span>
            <span>{ thai }</span>
            <span><PlayButton word={{ thai }} /></span>
        </div>));


    return <div className="detail">
        <div className="characters">{ confusedConsonants }</div>
    </div>;
};

ConfusionDetail.propTypes = {
    confusions: PropTypes.arrayOf(PropTypes.array),
    consonants: PropTypes.object,
    pronunciationType: PropTypes.oneOf([PRONUNCIATIONTYPE_IPA, PRONUNCIATIONTYPE_PAIBOON]).isRequired,
    visibleConfusion: PropTypes.number,
};

export default ConfusionDetail;