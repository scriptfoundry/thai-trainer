import { connect } from 'react-redux';
import { operations } from '../../store';
import ToneRules from './ToneRules';

import '../../styles/css/ToneRules.css';

const mapStateToProps = ({ tones: { tonesmap }, view: { hintVisible }}) => ({
    hintVisible,
    tonesmap,
});
export default connect(mapStateToProps, operations)(ToneRules);