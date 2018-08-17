import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Vowel from './Vowel';
import Examples from './Examples';
import VowelButton from './VowelButton';
import { sayWords, LANGUAGE_THAI } from '../../services/Voices';

class Vowels extends Component {
    componentDidMount() {
        this.props.initializeVowels();
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
            <section>
                { visibleVowel ? <Vowel vowel={ visibleVowel } pronunciationType={ pronunciationType } onNext={ showNextVowel } onPrev={ showPrevVowel } /> : ' ' }
                { visibleVowel ? <Examples examples={ visibleVowel.examples } /> : null}
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