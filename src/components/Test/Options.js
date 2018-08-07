import React from 'react';
import PropTypes from 'prop-types';
import Answer from './Answer';

const Options = (props) => {
    let { queue, index, selectAnswer, stage } = props;
    console.log(props)
    return <div className="options">
        <Answer />
    </div>;

};

Options.propTypes = {
    // queue: PropTypes.array.isRequired,
    index: PropTypes.number.isRequired,
    selectAnswer: PropTypes.func.isRequired,
    stage: PropTypes.number.isRequired,
};
export default Options;