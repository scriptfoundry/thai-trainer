import { connect } from 'react-redux';
import { operations } from '../../store';
import Settings from './Settings';

const mapStateToProps = ({
    voice: {thaiVoice, thaiVoices, englishVoice, englishVoices, rate},
    words: { words },
    settings: { pronunciationType, practiceWordLimit, testingWordLimit, practiceOrder, practiceAllAtOnce },
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
});

export default connect(mapStateToProps, operations)(Settings);