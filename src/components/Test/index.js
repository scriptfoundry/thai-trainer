import { connect } from 'react-redux';
import { operations } from '../../store';
import Test from './Test';

import './Test.css';

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
    changeView: state.view.changeView,
});

export default connect(mapStateToProps, operations)(Test);