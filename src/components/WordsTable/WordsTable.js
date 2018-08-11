import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getDayOfEpoch, memoize } from '../../services/Utils';
import { filterByRoughStatus } from '../../services/Leitner';
import ProgressItem from './ProgressItem';
import './WordsTable.css';

const getFilteredWordsList = memoize(filterByRoughStatus);

class WordsTable extends Component {
    render() {
        const { words, previewFilter, pronunciationType, showProgress } = this.props;

        const items = getFilteredWordsList(words, getDayOfEpoch(new Date()), previewFilter)
            .map(word => <ProgressItem word={ word } key={ word.id } pronunciationType={ pronunciationType } showProgress={ showProgress } />);

        return <div className="words-table">
            <table>
                <thead>
                    <tr>
                        <th>Term</th>
                        <th>Thai</th>
                        <th>Pronunciation</th>
                        { showProgress ? <th>Progress</th> : null }
                    </tr>
                </thead>
                <tbody>
                    { items }
                </tbody>
            </table>
        </div>;

    }
}

WordsTable.propTypes = {
    pronunciationType: PropTypes.string.isRequired,
    previewFilter: PropTypes.arrayOf(PropTypes.number).isRequired,
    showProgress: PropTypes.bool,
    words: PropTypes.array.isRequired,
};
WordsTable.defaultProps = {
    showProgress: true
};

export default WordsTable;