import { connect } from 'react-redux';
import TestSelector from './TestSelector';
import { operations } from '../../store';

export default connect(null, operations)(TestSelector);