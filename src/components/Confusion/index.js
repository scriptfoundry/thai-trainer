import { connect } from 'react-redux';
import Confusion from './Confusion';
import { operations } from '../../store';

import '../../styles/css/Confusion.css';
import '../../styles/css/Drill.css';

const mapStateToProps = ({ settings: { pronunciationType }, sounds: { consonants, confusions, confusionLoaded, visibleConfusion, showConfusionByIndex }, view: { hintVisible } }) => ({
    consonants,
    confusions,
    confusionLoaded,
    hintVisible,
    pronunciationType,
    visibleConfusion,
    showConfusionByIndex,
});
export default connect(mapStateToProps, operations)(Confusion);