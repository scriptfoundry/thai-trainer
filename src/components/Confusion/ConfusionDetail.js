import React from 'react';
import PropTypes from 'prop-types';
import { PRONUNCIATIONTYPE_IPA, PRONUNCIATIONTYPE_PAIBOON } from '../../services/WordManager';
import { memoize } from '../../services/Utils';
import PlayButton from '../common/PlayButton';

const sortConfusions = memoize(({ consonants: [a1, a2, a3]}, { consonants: [b1, b2, b3]}) =>
    a1 > b1 ? 1 :
    a1 < b1 ? -1 :
    a2 > b2 ? 1 :
    a2 < b2 ? -1 :
    a3 > b3 ? 1 :
    -1
);

const ConfusionDetail = ({confusions, visibleConfusion, consonants, pronunciationType, drillConfusion}) => {
    const confusedConsonants = confusions[visibleConfusion]
        .map(character => ({ character, consonants: consonants[character]})).sort(sortConfusions)
        .map((({character, consonants: [,,ipa,paiboon,thai]}) => <div key={ character }>
            <span>{ character }</span>
            <span>{ pronunciationType === PRONUNCIATIONTYPE_IPA ? ipa : paiboon }</span>
            <span>{ thai }</span>
            <span><PlayButton word={{ thai }} /></span>
        </div>));


    return <div className="detail">
        <div className="characters">{ confusedConsonants }</div>

        <button className="drill-button" onClick={ drillConfusion }>Drill</button>
    </div>;
};

ConfusionDetail.propTypes = {
    confusions: PropTypes.arrayOf(PropTypes.array),
    consonants: PropTypes.object,
    pronunciationType: PropTypes.oneOf([PRONUNCIATIONTYPE_IPA, PRONUNCIATIONTYPE_PAIBOON]).isRequired,
    visibleConfusion: PropTypes.number,

    drillConfusion: PropTypes.func.isRequired,
};

export default ConfusionDetail;