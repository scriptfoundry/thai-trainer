import React from 'react';
import PropTypes from 'prop-types';

const Progress = ({ label='', max, value }) => {
    const width = `${ Math.min(Math.max(0, value / max), 1) * 100 }%`;
    return <div className="progress-bar">
        <div className="bar" style={{ width }}></div>
        <div className="label">{ label }</div>
    </div>;
};

Progress.propTypes = {
    label: PropTypes.string,
    max: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export default Progress;