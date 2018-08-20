import { connect } from 'react-redux';
import Consonants from './Consonants';
import { operations } from '../../store';

import '../../styles/css/Consonants.css';

const mapStateToProps = ({ sounds: { consonants, confusions, consonantKeys, consonantsLoaded, visibleConsonantKey }, settings }) => ({
    pronunciationType: settings.pronunciationType,
    consonants,
    confusions,
    consonantKeys,
    consonantsLoaded,
    visibleConsonantKey,
});
export default connect(mapStateToProps, operations)(Consonants);