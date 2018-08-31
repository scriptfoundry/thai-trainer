import { connect } from 'react-redux';
import { operations } from '../../store';
import Test from './Test';

const mapStateToProps = ({ test: { isComplete, isSaved, queue }, view: { hintVisible }}) => ({
    hintVisible,
    isComplete,
    isSaved,
    queue,
});

export default connect(mapStateToProps, operations)(Test);