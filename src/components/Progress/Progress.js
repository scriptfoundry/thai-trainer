import React from 'react';
import PropTypes from 'prop-types';
import { getDayOfEpoch, memoize } from '../../services/Utils';
import { organizeByRoughStatus, STATUS_OVERDUE, STATUS_MASTERED, STATUS_NONE, STATUS_WAITING, STATUS_PRACTICE } from '../../services/Leitner';

import ProgressItem from './ProgressItem';


const getProgressGroupByStatus = memoize(organizeByRoughStatus);

const Progress = ({ changeView, changePreviewTab, words, pronunciationType, previewTab }) => {
    const sections = getProgressGroupByStatus(words, getDayOfEpoch(new Date()));
    const items = sections[previewTab].map(word => <ProgressItem key={word.id} word={word} pronunciationType={ pronunciationType } />);

    return <div className="progress">
        <button className="back-button" onClick={ () => changeView('navigation') }>Back</button>
        <div className="table">
            <div className="thead">
                <button onClick={ () => changePreviewTab(STATUS_PRACTICE) } disabled={ previewTab === STATUS_PRACTICE }>Practice words</button>
                <button onClick={ () => changePreviewTab(STATUS_OVERDUE) } disabled={ previewTab === STATUS_OVERDUE }>Test words</button>
                <button onClick={ () => changePreviewTab(STATUS_WAITING) } disabled={ previewTab === STATUS_WAITING }>Awaiting more tests</button>
                <button onClick={ () => changePreviewTab(STATUS_MASTERED) } disabled={ previewTab === STATUS_MASTERED }>Mastered words</button>
                <button onClick={ () => changePreviewTab(STATUS_NONE) } disabled={ previewTab === STATUS_NONE }>Pending words</button>
            </div>
            <div className="tbody">{ items }</div>
        </div>
    </div>;
};

Progress.propTypes = {
    words: PropTypes.array.isRequired,
    pronunciationType: PropTypes.string.isRequired,
    changeView: PropTypes.func.isRequired,
    changePreviewTab: PropTypes.func.isRequired,
    previewTab: PropTypes.number
};
export default Progress;