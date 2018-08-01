import React from 'react';
import PropTypes from 'prop-types';

export const ToggleHeader = ({ children, onClick, selected }) => <div onClick={ onClick } className={`toggle-header ${ selected ? 'selected' : ''}`}>{ children }</div>;

ToggleHeader.propTypes = {
    children: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired
};

export default ToggleHeader;