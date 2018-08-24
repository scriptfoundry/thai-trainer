import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isPronunciation, say, LANGUAGE_THAI } from '../../services/Voices';
import PlayButton from '../common/PlayButton';


class Question extends Component {
    componentDidMount() {
        const { property } = this.props;

        this.speak = this.speak.bind(this);

        if (isPronunciation(property)) setTimeout(this.speak, 500);
    }
    speak() {
        const { word: { thai } } = this.props;
        say(LANGUAGE_THAI, thai);
    }
    render() {
        const { word, property } = this.props;
        if (isPronunciation(property)) return <div className="question">Listen <PlayButton word={word} /></div>;
        return <div className="question">{ word[property] }</div>;
    }
}
Question.propTypes = {
    word: PropTypes.shape({
        term: PropTypes.string.isRequired,
        thai: PropTypes.string.isRequired,
        ipa: PropTypes.string.isRequired,
        paiboon: PropTypes.string.isRequired,
    }).isRequired,
    property: PropTypes.string.isRequired,
};

export default Question;