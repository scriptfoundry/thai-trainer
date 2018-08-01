import React from 'react';
import PropTypes from 'prop-types';
import { getDayOfEpoch, memoize } from '../../services/Utils';
import { filterByRoughStatus, STATUS_OVERDUE, STATUS_MASTERED, STATUS_NONE, STATUS_WAITING, STATUS_PRACTICE } from '../../services/Leitner';
import ToggleHeader from './ToggleHeader';
import ProgressItem from './ProgressItem';


const getFilteredWordsList = memoize(filterByRoughStatus);

const Progress = ({ changeView, togglePreviewFilterStatus, words, pronunciationType, previewFilter }) => {
    const items = getFilteredWordsList(words, getDayOfEpoch(new Date()), previewFilter)
        .map(word => <ProgressItem word={ word } key={ word.id } pronunciationType={ pronunciationType } />);

    return <div className="progress">
        <button className="back-button" onClick={ () => changeView('navigation') }>Back</button>
        <div className="table">
            <div className="thead">
                <ToggleHeader onClick={ () => togglePreviewFilterStatus(STATUS_PRACTICE) } selected={ previewFilter.includes(STATUS_PRACTICE) }>Practice words</ToggleHeader>
                <ToggleHeader onClick={ () => togglePreviewFilterStatus(STATUS_OVERDUE) } selected={ previewFilter.includes(STATUS_OVERDUE) }>Currently due for testing</ToggleHeader>
                <ToggleHeader onClick={ () => togglePreviewFilterStatus(STATUS_WAITING) } selected={ previewFilter.includes(STATUS_WAITING) }>Pending tests</ToggleHeader>
                <ToggleHeader onClick={ () => togglePreviewFilterStatus(STATUS_MASTERED) } selected={ previewFilter.includes(STATUS_MASTERED) }>Mastered words</ToggleHeader>
                <ToggleHeader onClick={ () => togglePreviewFilterStatus(STATUS_NONE) } selected={ previewFilter.includes(STATUS_NONE) }>Future words</ToggleHeader>
            </div>
            <div className="tbody">{ items }</div>
        </div>
    </div>;
};

Progress.propTypes = {
    words: PropTypes.array.isRequired,
    pronunciationType: PropTypes.string.isRequired,
    changeView: PropTypes.func.isRequired,
    togglePreviewFilterStatus: PropTypes.func.isRequired,
    previewFilter: PropTypes.arrayOf(PropTypes.number).isRequired
};
export default Progress;