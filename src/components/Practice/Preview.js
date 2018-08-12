import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getDayOfEpoch, memoize } from '../../services/Utils';
import { filterByRoughStatus, STATUS_PRACTICE } from '../../services/Leitner';
import WordsTable from '../WordsTable';

const getFilteredWordsList = memoize(filterByRoughStatus);

class Preview extends Component {
    componentDidMount() {
        const { seedPractice, words, practiceWordLimit } = this.props;

        seedPractice(words, practiceWordLimit);
    }

    render() {
        const { changeSubview, practiceWordLimit, words } = this.props;

        const visibleWords = getFilteredWordsList(words, getDayOfEpoch(new Date()), [STATUS_PRACTICE]).slice(0, practiceWordLimit);

        return <div className="preview">
            <section>
                <button className="start-button" onClick={ () => changeSubview('cards') }>Start</button>
            </section>
            <section>
                <h2>Words for this session</h2>
                <WordsTable visibleWords={ visibleWords } showPreview={false} showProgress={ false } />
            </section>
        </div>;
    }
}

Preview.propTypes = {
    words: PropTypes.array.isRequired,
    practiceWordLimit: PropTypes.number.isRequired,
    changeSubview: PropTypes.func.isRequired,
    seedPractice: PropTypes.func.isRequired,
};

export default Preview;