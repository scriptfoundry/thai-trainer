import { connect } from 'react-redux';
import { operations } from '../../store';
import TestResults from './TestResults';

const mapStateToProps = state => ({
    testWords: state.test.testWords,
    scores: state.test.scores,
    queue: state.test.queue,
    pronunciationType: state.settings.pronunciationType,
});
export default connect(mapStateToProps, operations)(TestResults);