import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getDayOfEpoch, memoize } from '../../services/Utils';
import { filterByRoughStatus, STATUS_PRACTICE } from '../../services/Leitner';
import WordsTable from '../WordsTable';

const getFilteredWordsList = memoize(filterByRoughStatus);

const Preview = ({ practiceWordLimit, words}) => {
    const visibleWords = getFilteredWordsList(words, getDayOfEpoch(new Date()), [STATUS_PRACTICE]).slice(0, practiceWordLimit);

    return <div className="preview">
        <Link className="start-button" to="/practice/full">Full practice</Link>
        <Link className="start-button" to="/practice/sounds-only">Sounds only</Link>
        <section>
            <h2>Words for this session</h2>
            <WordsTable visibleWords={ visibleWords } showPreview={false} showProgress={ false } />
        </section>
    </div>;
};

Preview.propTypes = {
    words: PropTypes.array.isRequired,
    practiceWordLimit: PropTypes.number.isRequired,
};

export default Preview;