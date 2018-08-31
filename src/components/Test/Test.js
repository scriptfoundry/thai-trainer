import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TestSelector from '../TestSelector';
import Quiz from '../Quiz';
import TestResults from '../TestResults';
import Hint from '../common/Hint';
import { TEST_TYPECURRENT, TEST_TYPEOVERDUE } from '../../services/Leitner';

class Test extends Component {
    componentDidMount() {
        const { history, match: { params }, setTestType } = this.props;

        if (params.type === 'current') setTestType(TEST_TYPECURRENT) || history.replace('/test');
        else if (params.type === 'overdue') setTestType(TEST_TYPEOVERDUE) || history.replace('/test');
        else history.replace('/test');
    }
    componentDidUpdate() {
        if (this.props.isSaved) this.props.history.push('/progress');
    }
    componentWillUnmount() {
        this.props.clearTest();
    }
    render() {
        const { isComplete, queue } = this.props;

        if (isComplete) return <TestResults />;
        if (queue.length === 0) return <TestSelector />;

        return <Fragment>
            <Quiz />

            <Hint { ...this.props } title="Notes">
                <ul>
                    <li>This will test your knowledge of each word you have practiced.</li>
                    <li>Each test test is divided into three sections: meaning, pronunciation and spelling.</li>
                    <li>A word is considered &quot;correct&quot; only if you have correctly answered it in each section.</li>
                    <li>To advance, select one item from both columns.</li>
                    <li>Testing is the cornerstone of this app. It not only gauges your knowledge. It also reminds you of words before you can forget them. </li>
                    <li>Failing a word is perfectly good and normal. It will simply allow you more time to master that word.</li>
                    <li>Please do not allow the tests to seem tedious. If they do, go to settings and reduce the number of words to test at once.</li>
                    <li>You will be tested for each word a minimum of 5 times, spread over a minimum of 28 days.</li>
                    <li>How often and how many times you are tested on a word depends on how accurate you are in these tests.</li>
                    <li>Words you are having trouble will appear in tests more often. Easy words will become rare.</li>
                </ul>
            </Hint>
        </Fragment>;
    }
}

Test.propTypes = {
    isComplete: PropTypes.bool,
    isSaved: PropTypes.bool,
    queue: PropTypes.array,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        replace: PropTypes.func.isRequired
    }),
    match: PropTypes.shape({
        params: PropTypes.object
    }),
    setTestType: PropTypes.func.isRequired,
    clearTest: PropTypes.func.isRequired,
};

export default withRouter(Test);