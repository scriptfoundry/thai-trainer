import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { say, LANGUAGE_THAI, LANGUAGE_ENGLISH } from '../../services/Voices';
import PlayButton from '../common/PlayButton';

class Sounds extends Component {
    constructor(...args) {
        super(...args);

        this.advance = this.advance.bind(this);
        this.nudge = this.nudge.bind(this);
        this.onKey = this.onKey.bind(this);

        document.addEventListener('keydown', this.onKey);
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.onKey);
    }
    advance(direction) {
        this.props.advanceSound(direction);
    }
    nudge() {
        this.props.advanceSound();
    }
    onKey({code}) {
        if ((code === 'Space' || code === 'ArrowDown')) this.nudge();
        else if (code === 'ArrowRight') this.nudge();
        else if (code === 'ArrowLeft' || code === 'ArrowUp') this.advance(-1);
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
    currentIndex: PropTypes.number.isRequired,
    queue: PropTypes.array.isRequired,
    currentStage: PropTypes.number.isRequired,
};

export default Sounds;