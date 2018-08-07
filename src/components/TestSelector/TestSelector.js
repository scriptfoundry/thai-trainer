import React from 'react';
import PropTypes from 'prop-types';
import { TEST_TYPECURRENT, TEST_TYPEOVERDUE } from '../../services/Leitner';

const TestSelector = ({ setTestType }) => {
    return <div className="test-selector">
        <button onClick={ () => setTestType(TEST_TYPEOVERDUE) }>Outstanding words</button>
        <button onClick={ () => setTestType(TEST_TYPECURRENT) }>Current test words</button>
    </div>;
};
TestSelector.propTypes = {
    setTestType: PropTypes.func.isRequired,
};

export default TestSelector;