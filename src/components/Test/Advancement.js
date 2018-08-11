import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

class Advancement extends Component {
    constructor(...args) {
        super(...args);
        this.defaultButtonRef = createRef();
    }
    componentDidUpdate() {
        if (this.defaultButtonRef.current) this.defaultButtonRef.current.focus();
    }
    render() {
        const { isAnswered, isCorrect, isLastQuestion, submitAnswer } = this.props;

        if (isAnswered && isLastQuestion) return <div className="advancement">
            <button className={ isCorrect ? 'default success' : 'default fail'} ref={ this.defaultButtonRef } onClick={ () => submitAnswer(isCorrect) }>View Results</button>
        </div>;
        if (isAnswered && isCorrect) return <div className="advancement">
            <button className="default success" ref={ this.defaultButtonRef } onClick={ () => submitAnswer(isCorrect) }>Very good! Next</button>
        </div>;

        if (isAnswered) return <div className="advancement">
            <button className="small-text" onClick={ () => submitAnswer(isCorrect) }>Mark as correct anyway</button>
            <button className="default fail" ref={ this.defaultButtonRef } onClick={ () => submitAnswer(isCorrect) }>Next</button>
        </div>;

        return <div className="advancement">
            <button className="default" onClick={ () => submitAnswer(null) }>Not sure / Skip</button>
        </div>;

    }
}

Advancement.propTypes = {
    index: PropTypes.number.isRequired,
    isCorrect: PropTypes.bool,
    isAnswered: PropTypes.bool.isRequired,
    isLastQuestion: PropTypes.bool.isRequired,
    submitAnswer: PropTypes.func.isRequired,
};

export default Advancement;