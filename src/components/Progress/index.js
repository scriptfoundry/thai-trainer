import { connect } from 'react-redux';
import { operations } from '../../store';
import Progress from './Progress';

import './Progress.css';

const mapStateToProps = state => ({
    words: state.words.words,
    pronunciationType: state.settings.pronunciationType,
    previewFilter: state.view.previewFilter,
});

const { changeView, togglePreviewFilterStatus } = operations;
export default connect(mapStateToProps, { changeView, togglePreviewFilterStatus })(Progress);