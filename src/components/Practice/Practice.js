import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Preview from './Preview';
import CardContainer from './CardContainer';

const Practice = ({ subview, ...props }) => {
    return (<div className="practice">
        <Link className="test-button" to="/test/current">Test now <span className="icon">〉</span></Link>
        <h1>Practice</h1>
        { subview === null ? <Preview { ...props } /> : subview === 'cards' ? <CardContainer { ...props } /> : null }
    </div>);
};

Practice.propTypes = {
    subview: PropTypes.string,
    queue: PropTypes.array,
};

export default Practice;