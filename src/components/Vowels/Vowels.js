import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Vowel from './Vowel';
import VowelButton from './VowelButton';
import { sayWords, LANGUAGE_THAI } from '../../services/Voices';

class Vowels extends Component {
    constructor(...args) {
        super(...args);

        this.onKey = this.onKey.bind(this);
    }
    componentDidMount() {
        this.props.initializeVowels();
        document.addEventListener('keydown', this.onKey);
    }
    componentWillUnmount(){
        document.removeEventListener('keydown', this.onKey);
    }
    onKey({ code }) {
        const { showNextVowel, showPrevVowel, visibleVowel } = this.props;

        if (!visibleVowel) return;

        if ((code === 'Space' || code === 'ArrowRight')) showNextVowel(visibleVowel);
        else if (code === 'ArrowLeft') showPrevVowel(visibleVowel);
    }
    componentDidUpdate(props) {
        const { visibleVowel } = this.props;
        if (visibleVowel && props.visibleVowel !== visibleVowel) {
            const { examples } = visibleVowel;
            sayWords(LANGUAGE_THAI, examples);
        }
    }
    render() {
        const { pronunciationType, showVowel, visibleVowel, vowels, showNextVowel, showPrevVowel  } = this.props;
        const buttons = vowels.map((vowel, index) => <VowelButton key={index} vowel={ vowel } visibleVowel={ visibleVowel } onClick={ () => showVowel(vowel) }  />);
        return <div className="vowels">
            <section className="visible-vowel">
                { visibleVowel ? <Vowel vowel={ visibleVowel } pronunciationType={ pronunciationType } onNext={ showNextVowel } onPrev={ showPrevVowel } /> : ' ' }
            </section>
            <div className="buttons">{buttons}</div>
        </div>;
    }
}

Vowels.propTypes = {
    initializeVowels: PropTypes.func.isRequired,
    pronunciationType: PropTypes.string.isRequired,
    showVowel: PropTypes.func.isRequired,
    visibleVowel: PropTypes.shape({
        examples: PropTypes.arrayOf(PropTypes.string)
    }),
    vowels: PropTypes.array.isRequired,
    showNextVowel: PropTypes.func.isRequired,
    showPrevVowel: PropTypes.func.isRequired,
};

export default Vowels;