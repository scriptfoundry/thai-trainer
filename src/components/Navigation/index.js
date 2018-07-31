import { connect } from 'react-redux';
import { operations } from '../../store';
import Navigation from './Navigation';

const mapStateToProps = state => ({
    words: state.words.words
});

const { changeView } = operations;
export default connect(mapStateToProps, { changeView })(Navigation);
