import React from 'react';
import PropTypes from 'prop-types';
import CircularProgressbar from 'react-circular-progressbar';


const ProgressIcon = ({ progress }) => <div className="progress-meter">
    <CircularProgressbar
        percentage={progress * 100}
        strokeWidth={ 30 }
        styles={{
            background: { fill: '#3e98c7' },
            path: { stroke: progress < 1 ? '#3e98c7' : 'gold' },
            trail: { stroke: '#eee' },
        }}
    />
</div>;

ProgressIcon.propTypes = {
    progress: PropTypes.number
};

export default ProgressIcon;