import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { say, LANGUAGE_THAI, LANGUAGE_ENGLISH } from '../../services/Voices';
import Line from './Line';

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
        const { currentIndex, queue, currentStage, showCharacterClasses } = this.props;

        const word = queue[currentIndex];
        if (!word) return null;
        if (currentStage === 0) say(LANGUAGE_THAI, word);
        else say(LANGUAGE_ENGLISH, word);

        const card = <CSSTransition  key={word.id} timeout={500} classNames="card">
            <div className="card">
                <Line type="thai" word={ word } showCharacterClasses={ showCharacterClasses } index={0} stage={ currentStage } />
                <Line type="term" word={ word } index={ 1 } stage={ currentStage } />
            </div>
        </CSSTransition>;

        return <TransitionGroup className="cards">
            {card}
        </TransitionGroup>;
    }
}

Sounds.propTypes = {
    advanceSound: PropTypes.func.isRequired,
    nudgeSound: PropTypes.func.isRequired,
    registerPracticeEnd: PropTypes.func.isRequired,
    currentIndex: PropTypes.number.isRequired,
    queue: PropTypes.array.isRequired,
    currentStage: PropTypes.number.isRequired,
    showCharacterClasses: PropTypes.bool.isRequired,
};

export default Sounds;