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
        const { isAnswered, isCorrect, submitAnswer } = this.props;

        if (isAnswered && isCorrect) return <div className="advancement">
            <button className="default success" ref={ this.defaultButtonRef } onClick={ () => submitAnswer(true) }>Very good! Next</button>
        </div>;

        if (isAnswered) return <div className="advancement">
            <button className="small-text" onClick={ () => submitAnswer(true) }>Mark as correct anyway</button>
            <button className="default fail" ref={ this.defaultButtonRef } onClick={ () => submitAnswer(false) }>Next</button>
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
    submitAnswer: PropTypes.func.isRequired,
};

export default Advancement;