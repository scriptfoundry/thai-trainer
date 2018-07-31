import { connect } from 'react-redux';
import { operations } from '../../store';
import Practice from './Practice';

const { changeView } = operations;

export default connect(null, { changeView })(Practice);