import React from 'react';
import PropTypes from 'prop-types';
import { classNames } from '../../services/Utils';
import { PRONUNCIATIONTYPE_PAIBOON } from '../../services/WordManager';
import PlayButton from '../common/PlayButton';
import Thai from '../common/ColorizedThai';

const Line = ({ index, word, stage, practiceAllAtOnce, pronunciationType, prop, showCharacterClasses, type }) => {
    const isPronunciation = type === 'pronunciation';
    const isThai = type === 'thai';
    const visible = practiceAllAtOnce || stage >= index;

    const contents = isPronunciation ? word[pronunciationType === PRONUNCIATIONTYPE_PAIBOON ? 'paiboon': 'ipa'] :
        isThai && showCharacterClasses ? <Thai word={word} /> :
        word[type];

    const classes = classNames({
        visible,
        [prop]: true,
    });
    const playButton = isPronunciation ? <PlayButton word={word} /> : null;
    return <div className={classes}>{contents} {playButton}</div>;
};
Line.propTypes = {
    index: PropTypes.number.isRequired,
    practiceAllAtOnce: PropTypes.bool,
    pronunciationType: PropTypes.string,
    prop: PropTypes.string,
    showCharacterClasses: PropTypes.bool,
    stage: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    word: PropTypes.object.isRequired,
};

export default Line;