import { connect } from 'react-redux';
import { operations } from '../../store';
import Test from './Test';

const mapStateToProps = ({ test: { isComplete, queue }, words: { words }}) => ({
    isComplete,
    queue,
    words,
});

export default connect(mapStateToProps, operations)(Test);