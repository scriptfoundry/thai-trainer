import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { say, LANGUAGE_THAI, LANGUAGE_ENGLISH } from '../../services/Voices';
import PlayButton from '../common/PlayButton';

class Sounds extends Component {
    constructor(...args) {
        super(...args);

        this.cardsSeen = 0;

        this.onKey = this.onKey.bind(this);

        document.addEventListener('keydown', this.onKey);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.currentIndex !== this.props.currentIndex) this.cardsSeen += 1;
    }
    componentWillUnmount() {
        this.props.registerPracticeEnd('sounds', this.cardsSeen);
        document.removeEventListener('keydown', this.onKey);
    }
    onKey({ code, metaKey, shiftKey }) {
        if (metaKey || shiftKey) return;

        const { advanceSound, nudgeSound } = this.props;

        if ((code === 'Space' || code === 'ArrowDown' || code === 'Enter')) nudgeSound();
        else if (code === 'ArrowRight') advanceSound(1);
        else if (code === 'ArrowLeft') advanceSound(-1);
    }
    render() {
        const { currentIndex, queue, currentStage } = this.props;

        const word = queue[currentIndex];
        if (!word) return null;
        if (currentStage === 0) say(LANGUAGE_THAI, word.thai);
        else say(LANGUAGE_ENGLISH, word.term);

        return <div>
            <h1>{ word.thai } <PlayButton word={ word } /></h1>
            { currentStage > 0 ? <h2>{ word.term }</h2> : null }
        </div>;
    }
}

Sounds.propTypes = {
    advanceSound: PropTypes.func.isRequired,
    nudgeSound: PropTypes.func.isRequired,
    registerPracticeEnd: PropTypes.func.isRequired,
    currentIndex: PropTypes.number.isRequired,
    queue: PropTypes.array.isRequired,
    currentStage: PropTypes.number.isRequired,
};

export default Sounds;