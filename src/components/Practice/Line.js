import React from 'react';
import PropTypes from 'prop-types';
import { PRONUNCIATIONTYPE_PAIBOON } from '../../services/WordManager';
import PlayButton from '../common/PlayButton';
import { say, LANGUAGE_THAI } from '../../services/Voices';

const Line = ({ index, word, stage, practiceAllAtOnce, order, pronunciationType }) => {
    const type = order[index];
    const isPronunciation = type === 'pronunciation';

    const text = isPronunciation ? word[pronunciationType === PRONUNCIATIONTYPE_PAIBOON ? 'paiboon': 'ipa'] : word[type];

    const isVisible = practiceAllAtOnce || stage >= index;
    const classes = isVisible ? 'visible' : null;
    const saySample = () => say(LANGUAGE_THAI, word.thai);
    const playButton = isPronunciation ? <PlayButton saySample={ saySample } word={word} /> : null;
    return <div className={classes}><span>{text}</span> {playButton}</div>;
};
Line.propTypes = {
    index: PropTypes.number.isRequired,
    order: PropTypes.arrayOf(PropTypes.string).isRequired,
    practiceAllAtOnce: PropTypes.bool.isRequired,
    pronunciationType: PropTypes.string.isRequired,
    stage: PropTypes.number.isRequired,
    word: PropTypes.object.isRequired,
};

export default Line;