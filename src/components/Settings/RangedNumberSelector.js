import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';

const RangedNumberSelector = ({ min, max, value, onChange, heading }) => <div>
    <h2>{heading}</h2>
    <Slider min={min} max={max} step={1} value={ value } onChange={ onChange } />
    <div>{ value }</div>

</div>;

RangedNumberSelector.propTypes = {
    heading: PropTypes.string.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};
export default RangedNumberSelector;