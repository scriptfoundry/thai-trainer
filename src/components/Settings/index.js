import { connect } from 'react-redux';
import { operations } from '../../store';
import Settings from './Settings';

const mapStateToProps = ({
    voice: {thaiVoice, thaiVoices, englishVoice, englishVoices, rate},
    words: { words },
    settings: { pronunciationType },
}) => ({
    words,
    englishVoice,
    englishVoices,
    thaiVoice,
    thaiVoices,
    rate,
    pronunciationType,
});

const { setEnglishVoice, setThaiVoice, setRate, changeView, changePronunciationType, saySample } = operations;

export default connect(mapStateToProps, { setEnglishVoice, setThaiVoice, setRate, changeView, changePronunciationType, saySample })(Settings);