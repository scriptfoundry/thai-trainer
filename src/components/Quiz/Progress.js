import React from 'react';
import PropTypes from 'prop-types';

const Progress = ({ index, queue }) => {
    const style={ width: `${ Math.floor(100 * index / queue.length) }%` };
    const className = `progress stage-${ Math.floor( 3 * index / queue.length ) }`;
    return <div className={ className }><div style={style } className="bar"></div></div>;
};

Progress.propTypes = {
    index: PropTypes.number.isRequired,
    queue: PropTypes.array.isRequired,
};

export default Progress;