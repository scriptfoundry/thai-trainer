import React from 'react';
import PropTypes from 'prop-types';
import Preview from './Preview';
import CardContainer from './CardContainer';

const Practice = ({ subview, ...props }) => {
    const { startCustomTest, queue } = props;

    return (<div className="practice">
        <h1>Practice</h1>
        <button className="test-button" onClick={ () => startCustomTest(queue) }>Test now <span className="icon">〉</span></button>
        { subview === null ? <Preview { ...props } /> : null }
        { subview === 'cards' ? <CardContainer { ...props } /> : null }
    </div>);
};

Practice.propTypes = {
    subview: PropTypes.string,
    startCustomTest: PropTypes.func,
    queue: PropTypes.array,
};

export default Practice;