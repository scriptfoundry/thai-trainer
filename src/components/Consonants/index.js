import { connect } from 'react-redux';
import Consonants from './Consonants';
import { operations } from '../../store';

import '../../styles/css/Consonants.css';

const mapStateToProps = ({ settings: { pronunciationType }, sounds: { consonants, consonantKeys, consonantsLoaded, visibleConsonantKey } }) => ({
    consonants,
    consonantKeys,
    consonantsLoaded,
    pronunciationType,
    visibleConsonantKey,
});
export default connect(mapStateToProps, operations)(Consonants);