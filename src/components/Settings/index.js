import { connect } from 'react-redux';
import { operations } from '../../store';
import Settings from './Settings';

import '../../styles/css/Settings.css';

const mapStateToProps = ({
    voice: {thaiVoice, thaiVoices, englishVoice, englishVoices, rate},
    words: { words },
    settings: { pronunciationType, practiceWordLimit, testingWordLimit, practiceOrder, practiceAllAtOnce, showCharacterClasses },
}) => ({
    words,
    englishVoice,
    englishVoices,
    thaiVoice,
    thaiVoices,
    rate,
    pronunciationType,
    practiceWordLimit,
    testingWordLimit,
    practiceOrder,
    practiceAllAtOnce,
    showCharacterClasses,
});

export default connect(mapStateToProps, operations)(Settings);