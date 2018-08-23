import { connect } from 'react-redux';
import TestSelector from './TestSelector';
import { operations } from '../../store';

import '../../styles/css/Navigation.css';

const mapStateToProps = state => ({
    testingWordLimit: state.settings.testingWordLimit,
    words: state.words.words
});

const { setTestType } = operations;
export default connect(mapStateToProps, { setTestType })(TestSelector);