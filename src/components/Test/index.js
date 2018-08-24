import { connect } from 'react-redux';
import { operations } from '../../store';
import Test from './Test';

const mapStateToProps = ({ test: { isComplete, isSaved, queue }}) => ({
    isComplete,
    isSaved,
    queue,
});

export default connect(mapStateToProps, operations)(Test);