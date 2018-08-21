import React from 'react';
import PropTypes from 'prop-types';
import { memoize } from '../../services/Utils';

const sortKeys = (a, b) => {
    if (a === 'Other') return 1;
    if (b === 'Other') return -1;
    return a > b ? 1 : -1;
};
const getSortedKeys = memoize((consontantKeys) => Object.keys(consontantKeys).sort(sortKeys) );

const CategoryPicker = ({ consonantKeys, showConsonantsByKey, visibleConsonantKey }) => {
    let headings = getSortedKeys(consonantKeys).map(key => <li key={key} className={ key === visibleConsonantKey ? 'selected' : null } onClick={ () => showConsonantsByKey(key) }>{key}</li>);
    return <nav className="category-picker">
        <ol>{ headings }</ol>
    </nav>;
};

CategoryPicker.propTypes = {
    consonantKeys: PropTypes.object.isRequired,
    showConsonantsByKey: PropTypes.func.isRequired,
    visibleConsonantKey: PropTypes.string,
};

export default CategoryPicker;
