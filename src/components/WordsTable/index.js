import { connect } from 'react-redux';
import { operations } from '../../store';
import WordsTable from './WordsTable';

import '../../styles/css/WordsTable.css';

const mapStateToProps = state => ({
    words: state.words.words,
    pronunciationType: state.settings.pronunciationType,
    previewFilter: state.view.previewFilter,
});

export default connect(mapStateToProps, operations)(WordsTable);