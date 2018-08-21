import React from 'react';
import PropTypes from 'prop-types';

const ConfusionPicker = ({ confusions, visibleConfusion, showConfusionByIndex }) => {
    let headings = confusions.map((confusion, index) => <li key={index} className={ index === visibleConfusion ? 'selected' : null } onClick={ () => showConfusionByIndex(index) }>{confusion[0]}</li>);

    return <nav className="confusion-picker">
        <ol>{ headings }</ol>
    </nav>;

};

ConfusionPicker.propTypes = {
    confusions: PropTypes.array,
    visibleConfusion: PropTypes.number,
    showConfusionByIndex: PropTypes.func.isRequired,

};

export default ConfusionPicker;