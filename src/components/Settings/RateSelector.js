import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';

const toPercent = v => `${Math.round(v * 100)}%`;
const RateSelector = ({ value, onChange }) => <div>
    <h2>Speech rate (Thai)</h2>
    <Slider min={0.5} max={1.8} step={0.1} value={ value } onChange={ onChange } />
    <div>{ toPercent(value) }</div>

</div>;

RateSelector.propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};
export default RateSelector;