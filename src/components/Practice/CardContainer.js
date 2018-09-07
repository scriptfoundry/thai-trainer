import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Card from './Card';
import Hint from '../common/Hint';
import { say, LANGUAGE_THAI } from '../../services/Voices';

export default class CardContainer extends Component {
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
        this.props.registerPracticeEnd('full', this.cardsSeen);
        document.removeEventListener('keydown', this.onKey);
    }
    onKey({code}) {
        const { advancePractice, practiceAllAtOnce, nudgePractice} = this.props;

        if (!practiceAllAtOnce && (code === 'Space' || code === 'ArrowDown' || code === 'Enter')) nudgePractice();
        else if (code === 'ArrowRight') advancePractice(1);
        else if (code === 'ArrowLeft') advancePractice(-1);
    }
    render() {
        const { pronunciationType, queue, currentIndex, currentStage, nudgePractice, practiceAllAtOnce, practiceOrder } = this.props;
        const word = queue[currentIndex];

        if (!word) return null;
        if (practiceAllAtOnce || practiceOrder[currentStage] === 'pronunciation') setTimeout(() => say(LANGUAGE_THAI, word.thai), 500);

        const card = (<CSSTransition key={word.id} timeout={500} classNames="card">
            <Card word={ queue[currentIndex] } stage={ currentStage } onClick={ () => nudgePractice(practiceAllAtOnce) } pronunciationType={pronunciationType} practiceAllAtOnce={ practiceAllAtOnce } practiceOrder={ practiceOrder } />
        </CSSTransition>);

        return <TransitionGroup className="cards">
            <Hint { ...this.props } title="Instructions">
                <p>Press [Space] or [Enter] to advance</p>
                <p>Press [Right Arrow] to skip to the next word.</p>
                <p>Press [Left Arrow] to jump back to the last word.</p>
                <p>Go to settings to change the number of words to practice at once.</p>
            </Hint>

            { card }
        </TransitionGroup>;
    }
}

CardContainer.propTypes = {
    currentIndex: PropTypes.number.isRequired,
    currentStage: PropTypes.number.isRequired,
    hintVisible: PropTypes.bool.isRequired,
    practiceAllAtOnce: PropTypes.bool.isRequired,
    practiceOrder: PropTypes.arrayOf(PropTypes.string).isRequired,
    practiceWordLimit: PropTypes.number.isRequired,
    pronunciationType: PropTypes.string.isRequired,
    queue: PropTypes.array.isRequired,
    words: PropTypes.array.isRequired,

    advancePractice: PropTypes.func.isRequired,
    nudgePractice: PropTypes.func.isRequired,
    closePractice: PropTypes.func.isRequired,
    toggleHint: PropTypes.func.isRequired,
    registerPracticeEnd: PropTypes.func.isRequired,
};