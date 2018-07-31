import React from 'react';
import PropTypes from 'prop-types';

const Practice = ({ changeView }) => <div className="practice">
    <button className="back-button" onClick={ () => changeView('navigation') }>Back</button>
    <h1>Practice</h1>
    <p>HI</p>
</div>;
Practice.propTypes = {
    changeView: PropTypes.func.isRequired
};

export default Practice;