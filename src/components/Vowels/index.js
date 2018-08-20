import { connect } from 'react-redux';
import { operations } from '../../store';
import Vowels from './Vowels';

import '../../styles/css/Vowels.css';

const mapStateToProps = ({ sounds, settings }) => ({
    pronunciationType: settings.pronunciationType,
    visibleVowel: sounds.visibleVowel,
    vowels: sounds.vowels
});

export default connect(mapStateToProps, operations)(Vowels);