import React from 'react';
import PropTypes from 'prop-types';
import Preview from './Preview';
import CardContainer from './CardContainer';

const Practice = ({ subview, ...props }) => {
    return (<div className="practice">
        <h1>Practice</h1>
        { subview === null ? <Preview { ...props } /> : null }
        { subview === 'cards' ? <CardContainer { ...props } /> : null }
    </div>);
};

Practice.propTypes = {
    subview: PropTypes.string
};

export default Practice;