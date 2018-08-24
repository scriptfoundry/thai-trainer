import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TestSelector from '../TestSelector';
import Quiz from '../Quiz';
import TestResults from '../TestResults';
import { TEST_TYPECURRENT, TEST_TYPEOVERDUE } from '../../services/Leitner';
class Test extends Component {
    componentDidMount() {
        const { history, match: { params }, setTestType } = this.props;

        if (params.type === 'current') setTestType(TEST_TYPECURRENT) || history.replace('/test');
        else if (params.type === 'overdue') setTestType(TEST_TYPEOVERDUE) || history.replace('/test');
        else history.replace('/test');

    }
    componentWillUnmount() {
        this.props.clearTest();
    }
    render() {
        const { isComplete, queue } = this.props;

        if (isComplete) return <TestResults />;
        if (queue.length === 0) return <TestSelector />;
        return <Quiz />;
    }
}

Test.propTypes = {
    isComplete: PropTypes.bool,
    queue: PropTypes.array,
    history: PropTypes.shape({
        replace: PropTypes.func.isRequired
    }),
    match: PropTypes.shape({
        params: PropTypes.object
    }),
    setTestType: PropTypes.func.isRequired,
    clearTest: PropTypes.func.isRequired,
};

export default withRouter(Test);