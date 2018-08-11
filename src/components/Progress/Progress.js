import React from 'react';
import PropTypes from 'prop-types';
import { STATUS_OVERDUE, STATUS_MASTERED, STATUS_NONE, STATUS_WAITING, STATUS_PRACTICE } from '../../services/Leitner';
import ToggleHeader from './ToggleHeader';
import WordsTable from '../WordsTable';



const Progress = ({ togglePreviewFilterStatus, words, previewFilter }) => {

    return <div className="progress-page">
        <div className="filter">
            <ToggleHeader onClick={ () => togglePreviewFilterStatus(STATUS_PRACTICE) } selected={ previewFilter.includes(STATUS_PRACTICE) }>Practice words</ToggleHeader>
            <ToggleHeader onClick={ () => togglePreviewFilterStatus(STATUS_OVERDUE) } selected={ previewFilter.includes(STATUS_OVERDUE) }>Currently due for testing</ToggleHeader>
            <ToggleHeader onClick={ () => togglePreviewFilterStatus(STATUS_WAITING) } selected={ previewFilter.includes(STATUS_WAITING) }>Pending tests</ToggleHeader>
            <ToggleHeader onClick={ () => togglePreviewFilterStatus(STATUS_MASTERED) } selected={ previewFilter.includes(STATUS_MASTERED) }>Mastered words</ToggleHeader>
            <ToggleHeader onClick={ () => togglePreviewFilterStatus(STATUS_NONE) } selected={ previewFilter.includes(STATUS_NONE) }>Future words</ToggleHeader>
        </div>
        <WordsTable words={ words } />
    </div>;
};

Progress.propTypes = {
    words: PropTypes.array.isRequired,
    togglePreviewFilterStatus: PropTypes.func.isRequired,
    previewFilter: PropTypes.arrayOf(PropTypes.number).isRequired
};
export default Progress;