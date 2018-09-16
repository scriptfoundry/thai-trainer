import { connect } from 'react-redux';
import { operations } from '../../store';
import ConsonantClasses from './ConsonantClasses';

import '../../styles/css/ConsonantClasses.css';

const mapStateToProps = ({ sounds: { confusions },  tones: { tonesmap }}) => ({
    confusions,
    tonesmap
});

export default connect(mapStateToProps, operations)(ConsonantClasses);
