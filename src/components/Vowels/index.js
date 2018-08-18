import { connect } from 'react-redux';
import { operations } from '../../store';
import Vowels from './Vowels';

import '../../styles/css/Vowels.css';

const mapStateToProps = ({ vowels, settings }) => ({
    pronunciationType: settings.pronunciationType,
    visibleVowel: vowels.visibleVowel,
    vowels: vowels.vowels
});

export default connect(mapStateToProps, operations)(Vowels);