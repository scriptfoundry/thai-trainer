import { connect } from 'react-redux';
import { operations } from '../../store';
import ToneRules from './ToneRules';

import '../../styles/css/ToneRules.css';

const mapStateToProps = ({ view: { hintVisible }}) => ({
    hintVisible,
});
export default connect(mapStateToProps, operations)(ToneRules);