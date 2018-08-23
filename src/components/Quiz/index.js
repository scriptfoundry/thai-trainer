import { connect } from 'react-redux';
import { operations } from '../../store';
import Quiz from './Quiz';

import '../../styles/css/Quiz.css';

const mapStateToProps = state => ({
    pronunciationType: state.settings.pronunciationType,
    testWords: state.test.testWords,
    queue: state.test.queue,
    type: state.test.type,
    stage: state.test.stage,
    isComplete: state.test.isComplete,
    submitAnswer: state.test.submitAnswer,
    index: state.test.index,
    words: state.words.words,
});

export default connect(mapStateToProps, operations)(Quiz);