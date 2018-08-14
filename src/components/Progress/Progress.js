import React from 'react';
import PropTypes from 'prop-types';
import { getDayOfEpoch, memoize } from '../../services/Utils';
import { filterByRoughStatus } from '../../services/Leitner';
import { STATUS_OVERDUE, STATUS_MASTERED, STATUS_NONE, STATUS_WAITING, STATUS_PRACTICE } from '../../services/Leitner';
import ToggleHeader from './ToggleHeader';
import WordsTable from '../WordsTable';

const getFilteredWordsList = memoize(filterByRoughStatus);

const Progress = ({ togglePreviewFilterStatus, words, previewFilter }) => {
    const visibleWords = getFilteredWordsList(words, getDayOfEpoch(new Date()), previewFilter);

    return <div className="progress-page">
        <h1>Progress</h1>
        <div className="filter">
            <ToggleHeader onClick={ () => togglePreviewFilterStatus(STATUS_PRACTICE) } selected={ previewFilter.includes(STATUS_PRACTICE) }>Practice words</ToggleHeader>
            <ToggleHeader onClick={ () => togglePreviewFilterStatus(STATUS_OVERDUE) } selected={ previewFilter.includes(STATUS_OVERDUE) }>Currently due for testing</ToggleHeader>
            <ToggleHeader onClick={ () => togglePreviewFilterStatus(STATUS_WAITING) } selected={ previewFilter.includes(STATUS_WAITING) }>Pending tests</ToggleHeader>
            <ToggleHeader onClick={ () => togglePreviewFilterStatus(STATUS_MASTERED) } selected={ previewFilter.includes(STATUS_MASTERED) }>Mastered words</ToggleHeader>
            <ToggleHeader onClick={ () => togglePreviewFilterStatus(STATUS_NONE) } selected={ previewFilter.includes(STATUS_NONE) }>Future words</ToggleHeader>
        </div>
        <WordsTable visibleWords={ visibleWords } />
    </div>;
};

Progress.propTypes = {
    words: PropTypes.array.isRequired,
    togglePreviewFilterStatus: PropTypes.func.isRequired,
    previewFilter: PropTypes.arrayOf(PropTypes.number).isRequired
};
export default Progress;