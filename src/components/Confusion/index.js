import { connect } from 'react-redux';
import Confusion from './Confusion';
import { operations } from '../../store';

import '../../styles/css/Confusion.css';

const mapStateToProps = ({ settings: { pronunciationType }, sounds: { consonants, confusions, confusionLoaded, visibleConfusion, showConfusionByIndex } }) => ({
    consonants,
    confusions,
    confusionLoaded,
    pronunciationType,
    visibleConfusion,
    showConfusionByIndex,
});
export default connect(mapStateToProps, operations)(Confusion);