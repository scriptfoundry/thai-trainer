import { connect } from 'react-redux';
import TestSelector from './TestSelector';
import { operations } from '../../store';

import '../../styles/css/TestSelector.css';

const mapStateToProps = state => ({
    testingWordLimit: state.settings.testingWordLimit,
    words: state.words.words
});

const { changeView, setTestType } = operations;
export default connect(mapStateToProps, { changeView, setTestType })(TestSelector);