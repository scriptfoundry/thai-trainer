import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { operations } from '../../store';

class PlayButton extends Component {
    constructor(...args) {
        super(...args);
        this.play = this.play.bind(this);
    }
    async play(evt) {
        evt.stopPropagation();
        evt.target.blur();
        let { word: {thai}, saySample } = this.props;
        await  saySample(thai);
    }
    render() {
        return <button onClick={ this.play }>▷</button>;
    }
}

PlayButton.propTypes = {
    saySample: PropTypes.func.isRequired,
    word: PropTypes.shape({
        thai: PropTypes.string.isRequired
    }).isRequired,
};

const { saySample } = operations;

export default connect(null, { saySample })(PlayButton);