import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Review from './Review';
import Drill from './Drill';

import { lowCharacters, midCharacters, highCharacters } from '../../services/Tones';

const lowChars = lowCharacters.split('');
const midChars = midCharacters.split('');
const highChars = highCharacters.split('');

class ConsonantClasses extends Component {
    componentWillMount() {
        // this.props.initializeTones();
        this.props.initializeConsonants();
    }

    render() {
        const { confusions, match: { params: { type } } } = this.props;

        return <div className="consonant-classes">
            { type === undefined ?
                <Review low={lowChars} mid={midChars} high={highChars} confusions={ confusions } /> :
                <Drill type={ type } low={lowChars}  high={highChars}  mid={midChars} />
            }
        </div>;
    }
}

ConsonantClasses.propTypes = {
    confusions: PropTypes.array,
    initializeConsonants: PropTypes.func.isRequired,
    initializeTones: PropTypes.func.isRequired,
    match: PropTypes.shape({ params: PropTypes.object }),
};
export default ConsonantClasses;