import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReviewCharacter from './ReviewCharacter';
import OutboundLink from '../common/OutboundLink';
import { getUniqueValues } from '../../services/Utils';

const buildCharacterList = (characters, highlight, highlightedCharacters) => characters.map(character => <ReviewCharacter key={character} character={character} highlight={highlight} highlightedCharacters={highlightedCharacters} />);

const findAllMatchingConfusions = (confusions, c) => getUniqueValues(confusions
    .filter(set => set.some(character => c === character))
    .reduce((carry, set) => [...carry, ...set], []));

class Review extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            highlightedCharacters: []
        };

        this.highlight = this.highlight.bind(this);
    }
    highlight(character) {
        if (!character) this.setState({ highlightedCharacters: [] });
        else this.setState({ highlightedCharacters: findAllMatchingConfusions(this.props.confusions, character)});
    }
    render() {
        const { low, mid, high } = this.props;
        const { highlightedCharacters } = this.state;

        return <div className="review">
            <h1>Consonant classes</h1>

            <ul className="hint">
                Hints:
                <li>Focus your energy on memorizing mid and high class characters, since there aren&apos;t very many of them. Any other consonant will be, by definition, low.</li>
                <li>I have done my best to show these characters in their order of frequency as tone-leading characters. You should try to learn them all, but like so many languages, the Thai alphabet closely follows <OutboundLink url="https://en.wikipedia.org/wiki/Zipf's_law">Zipf&apos;s Law</OutboundLink>, so remembering at least the first few characters will have a disproportionately powerful effect!</li>
                <li>Mouse over any character to highlight any other characters that you might consider similar-looking.</li>
            </ul>

            <section>
                <h2>High</h2>
                <div className="high">{ buildCharacterList(high, this.highlight, highlightedCharacters) }</div>
            </section>
            <section>
                <h2>Mid</h2>
                <div className="mid">{ buildCharacterList(mid, this.highlight, highlightedCharacters) }</div>
            </section>
            <section>
                <h2>Low</h2>
                <div className="low">{ buildCharacterList(low, this.highlight, highlightedCharacters) }</div>
            </section>
            <Link to="/basics/tones/classes/drill/mid-high" className="button">Practice mid / high</Link>
            <Link to="/basics/tones/classes/drill/all" className="button">Practice all</Link>
        </div>;
    }
}

Review.propTypes = {
    low: PropTypes.arrayOf(PropTypes.string).isRequired,
    mid: PropTypes.arrayOf(PropTypes.string).isRequired,
    high: PropTypes.arrayOf(PropTypes.string).isRequired,
    confusions: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default Review;