import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { say, LANGUAGE_THAI } from '../../services/Voices';

class PlayButton extends Component {
    constructor(...args) {
        super(...args);
        this.play = this.play.bind(this);
    }
    async play(evt) {
        evt.stopPropagation();
        evt.target.blur();
        let { word } = this.props;
        await  say(LANGUAGE_THAI, word);
    }
    render() {
        return <button onClick={ this.play }>▷</button>;
    }
}

PlayButton.propTypes = {
    word: PropTypes.shape({
        altThai: PropTypes.string,
        thai: PropTypes.string.isRequired
    }).isRequired,
};

export default PlayButton;