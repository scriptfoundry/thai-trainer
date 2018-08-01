import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Card from './Card';

export default class Practice extends Component {
    componentDidMount() {
        const { seedPractice, words, practiceWordLimit } = this.props;
        seedPractice(words, practiceWordLimit);

        this.onKey = this.onKey.bind(this);
        document.addEventListener('keydown', this.onKey);
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.onKey);
    }
    onKey({code}) {
        const { nudgePractice, advancePractice } = this.props;

        if (code === 'Space' || code === 'ArrowDown') nudgePractice();
        else if (code === 'ArrowRight') advancePractice(1);
        else if (code === 'ArrowLeft' || code === 'ArrowUp') advancePractice(-1);
    }
    render() {
        const { changeView, pronunciationType, queue, currentIndex, currentStage } = this.props;
        const word = queue[currentIndex];

        if (!word) return null;

        const card = (<CSSTransition key={word.id} timeout={500} classNames="card" >
            <Card word={ queue[currentIndex] } stage={ currentStage } pronunciationType={pronunciationType} />
        </CSSTransition>);

        return (<div className="practice">
            <button className="back-button" onClick={ () => changeView('navigation') }>Back</button>
            <h1>Practice</h1>

            <TransitionGroup className="container">
                { card }
            </TransitionGroup>
        </div>);
    }
}

Practice.propTypes = {
    currentIndex: PropTypes.number.isRequired,
    currentStage: PropTypes.number.isRequired,
    practiceWordLimit: PropTypes.number.isRequired,
    pronunciationType: PropTypes.string.isRequired,
    queue: PropTypes.array.isRequired,
    words: PropTypes.array.isRequired,

    advancePractice: PropTypes.func.isRequired,
    nudgePractice: PropTypes.func.isRequired,
    changeView: PropTypes.func.isRequired,
    closePractice: PropTypes.func.isRequired,
    seedPractice: PropTypes.func.isRequired,
};