import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Review from './Review';
import Drill from './Drill';

import { lowCharacters, midCharacters, highCharacters } from '../../services/Tones';
// import { buildRandomizedValuesQueue } from '../../services/Utils';

const lowChars = lowCharacters.split('');
const midChars = midCharacters.split('');
const highChars = highCharacters.split('');

class ConsonantClasses extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            testing: false
        };

        this.onKey = this.onKey.bind(this);

        this.startDrill = this.startDrill.bind(this);
    }
    componentWillMount() {
        this.props.initializeTones();
        this.props.initializeConsonants();
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.onKey);
    }
    startDrill() {
        this.setState({ testing: true });
        document.addEventListener('keydown', this.onKey);
    }
    onKey({code}) {
        // const { } = this.props;

        if (code === 'ArrowRight') console.log('mid'); // eslint-disable-line no-console
        else if (code === 'ArrowUp') console.log('high'); // eslint-disable-line no-console
        else if (code === 'ArrowDown') console.log('low'); // eslint-disable-line no-console
    }

    render() {
        const { confusions } = this.props;
        const { testing } = this.state;

        return <div className="consonant-classes">
            { testing ? <Drill /> : <Review low={lowChars} mid={midChars} high={highChars} start={ this.startDrill } confusions={ confusions } /> }
        </div>;
    }
}

ConsonantClasses.propTypes = {
    // tonesmap: PropTypes.arrayOf(PropTypes.shape({
    //     cls: PropTypes.string.isRequired,
    //     dur: PropTypes.string,
    //     ending: PropTypes.string,
    //     marker: PropTypes.string,
    //     examples: PropTypes.arrayOf(PropTypes.string).isRequired
    // })).isRequired,
    confusions: PropTypes.array,
    initializeConsonants: PropTypes.func.isRequired,
    initializeTones: PropTypes.func.isRequired
};
export default ConsonantClasses;