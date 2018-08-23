import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TestSelector from '../TestSelector';
import Quiz from '../Quiz';
import TestResults from '../TestResults';

class Test extends Component {
    componentDidMount() {
        const { history, match: { params }, getCurrentWords, getOverdueWords, words } = this.props;

        if (params.type === 'current') getCurrentWords(words) || history.replace('/test');
        else if (params.type === 'overdue') getOverdueWords(words) || history.replace('/test');
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
    words: PropTypes.array,
    history: PropTypes.shape({
        replace: PropTypes.func.isRequired
    }),
    match: PropTypes.shape({
        params: PropTypes.object
    }),
    getCurrentWords: PropTypes.func.isRequired,
    getOverdueWords: PropTypes.func.isRequired,
    clearTest: PropTypes.func.isRequired,
};

export default withRouter(Test);