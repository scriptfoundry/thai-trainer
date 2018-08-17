import React from 'react';
import PropTypes from 'prop-types';
import PlayButton from '../common/PlayButton';

const Examples = ({ examples }) => <div className="examples">
    { examples.map((example, index) => <span key={index}>{ example } <PlayButton word={{ thai: example }} /></span>) }
</div>;

Examples.propTypes = {
    examples: PropTypes.arrayOf(PropTypes.string)
};

export default Examples;