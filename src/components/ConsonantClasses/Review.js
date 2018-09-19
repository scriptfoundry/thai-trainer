import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReviewCharacter from './ReviewCharacter';
import Hint from '../common/Hint';
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

            <Hint {...this.props} title="Notes">
                <p>Mouse over any character to highlight the other characters you might consider similar-looking.</p>
                <p>Practice mid- and high-class characters first, since there aren&apos;t many to remember. All other consonant will be, by definition, low.</p>
                <p>Drilling here is <i>graduated</i> &mdash; that is, you will be tested on the first few of each class. More characters are added only after you have made no mistakes!</p>
                <p>The consonants are listed and drilled in order of (tone-leading) frequency. The Thai alphabet closely follows <OutboundLink url="https://en.wikipedia.org/wiki/Zipf's_law">Zipf&apos;s Law</OutboundLink>. So memorizing and mastering only the first few characters will be dramatically more helpful than memorizing only the last few!</p>
                <p>Author&apos;s note: My personal sense is that mnemonics do not help with character classes. Tone rules are hard enough. They should feel as automatic as possible, which is why I have chosen graduated drilling here.</p>
            </Hint>

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
            <Link to="/basics/tones/classes/drill/mid-high" className="button">Drill (mid / high)</Link>
            <Link to="/basics/tones/classes/drill/all" className="button">Drill (all)</Link>
        </div>;
    }
}

Review.propTypes = {
    low: PropTypes.arrayOf(PropTypes.string).isRequired,
    mid: PropTypes.arrayOf(PropTypes.string).isRequired,
    high: PropTypes.arrayOf(PropTypes.string).isRequired,
    confusions: PropTypes.arrayOf(PropTypes.array).isRequired,
    hintVisible: PropTypes.bool.isRequired,
};

export default Review;