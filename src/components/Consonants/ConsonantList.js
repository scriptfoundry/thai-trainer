import React from 'react';
import PropTypes from 'prop-types';
import { memoize } from '../../services/Utils';
import { PRONUNCIATIONTYPE_IPA, PRONUNCIATIONTYPE_PAIBOON } from '../../services/WordManager';
import PlayButton from '../common/PlayButton';

const getConsonants = memoize((consonants, visibleConsonants) => Object.keys(consonants)
    .filter(key => !visibleConsonants || visibleConsonants.indexOf(key) > -1)
    .map(character => ({ character, consonant: consonants[character] }) )
);

const ConsonantList = ({ consonantKeys, consonants, visibleConsonantKey, pronunciationType }) => {
    const items = getConsonants(consonants, consonantKeys[visibleConsonantKey])
        .map(({character, consonant: [,,ipa, paiboon, thai]}) => <div key={ character }>
            <span>{ character }</span>
            <span>{ pronunciationType === PRONUNCIATIONTYPE_IPA ? ipa : paiboon }</span>
            <span>{ thai }</span>
            <span><PlayButton word={{ thai }} /></span>
        </div>);

    return <div className="list">
        {items}
    </div>;
};

ConsonantList.propTypes = {
    consonantKeys: PropTypes.object,
    consonants: PropTypes.object.isRequired,
    visibleConsonantKey: PropTypes.string,
    pronunciationType: PropTypes.oneOf([ PRONUNCIATIONTYPE_IPA, PRONUNCIATIONTYPE_PAIBOON ]),
};

export default ConsonantList;