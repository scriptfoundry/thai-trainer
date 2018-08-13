import { connect } from 'react-redux';
import { operations } from '../../store';
import Progress from './Progress';

const mapStateToProps = state => ({
    words: state.words.words,
    previewFilter: state.view.previewFilter,
});

const { togglePreviewFilterStatus } = operations;
export default connect(mapStateToProps, { togglePreviewFilterStatus })(Progress);