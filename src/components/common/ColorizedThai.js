import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { getCachedCompents, TONE_CLASS_LOW, TONE_CLASS_MID, TONE_CLASS_HIGH } from '../../services/Tones';

const getClassName = classIndex => classIndex === TONE_CLASS_LOW ? 'tc_low' :
    classIndex === TONE_CLASS_MID ? 'tc_mid' :
    classIndex === TONE_CLASS_HIGH ? 'tc_high' :
    'tc_none';

    const buildComponents = parts => parts.map(([component, className], index) => <span key={index} className={ getClassName(className) }>{ component }</span>);

const Thai = ({word}) => <Fragment>
    { buildComponents(getCachedCompents(word.thai)) }
</Fragment>;

Thai.propTypes = {
    word: PropTypes.shape({
        thai: PropTypes.string.isRequired
    }).isRequired
};

export default Thai;