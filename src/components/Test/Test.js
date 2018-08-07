import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Stage from './Stage';
import { makeSimilaritySorter } from '../../services/Utils';
const Test = (props) => {
    const { stage, type, setTestType, isComplete } = props;
    // else if (isComplete) return <Report {...props } />;

    return <Stage {...props} />;
};

Test.propTypes = {
    type: PropTypes.number,
    testWords: PropTypes.array.isRequired,
    stage: PropTypes.number,
    isComplete: PropTypes.bool.isRequired,
    index: PropTypes.number,
    words: PropTypes.array.isRequired,

    setTestType: PropTypes.func.isRequired
};

export default Test;