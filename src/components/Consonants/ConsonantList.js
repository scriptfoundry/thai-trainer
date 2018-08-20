import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ConsonantGroup from './ConsonantGroup';
import { PRONUNCIATIONTYPE_IPA } from '../../services/WordManager';

const reduceConsonantsToGroups = (consonants, pronunciationType) => (carry, item) => {
    const { consonant } = item;
    const [,,ipa, paiboon] = consonant ;
    const pronunciation = pronunciationType === PRONUNCIATIONTYPE_IPA ? ipa : paiboon;

    if (!carry[pronunciation]) carry[pronunciation] = [];
    carry[pronunciation].push(item);

    return carry;
};

const ConsonantList = ({ consonantKeys, consonants, pronunciationType, visibleConsonantKey }) => {
    const visibleConsonants = consonantKeys[visibleConsonantKey].map(character => ({ character, consonant: consonants[character]}));
    const consonantGroups = visibleConsonants
        .reduce(reduceConsonantsToGroups(consonants, pronunciationType), {});

    const groups = Object.keys(consonantGroups).map((key) => <ConsonantGroup key={key} groupName={key} consonants={ consonantGroups[key] } /> );

    return <Fragment>
        { groups }
    </Fragment>;
};

ConsonantList.propTypes = {
    consonantKeys: PropTypes.object,
    consonants: PropTypes.object,
    pronunciationType: PropTypes.string.isRequired,
    visibleConsonantKey: PropTypes.string,
};

export default ConsonantList;