import { connect } from 'react-redux';
import { operations } from '../../store';
import Navigation from './Navigation';

import '../../styles/css/Navigation.css';

const mapStateToProps = state => ({
    currentView: state.view.currentView,
});

const { changeView } = operations;
export default connect(mapStateToProps, { changeView })(Navigation);
