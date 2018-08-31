import React from 'react';
import PropTypes from 'prop-types';
import { classNames } from '../../services/Utils';

import '../../styles/css/Hint.css';

const Hint = ({ children, toggleHint, title, hintVisible }) => {
    const classes = classNames({
        hint: true,
        visible: hintVisible
    });

    return <div className={ classes }>
        <div className="overlay">
            <div className="background" onClick={ toggleHint }></div>
            <div className="content">
                <div className="left-side">
                ℹ
                </div>
                <div className="right-side">
                    <h2>{ title }</h2>
                    <section>{ children }</section>
                </div>
            </div>
        </div>
        <button onClick={ toggleHint }>?</button>
    </div>;
};


Hint.propTypes = {
    children: PropTypes.any.isRequired,
    toggleHint: PropTypes.func.isRequired,
    title: PropTypes.string,
    hintVisible: PropTypes.bool.isRequired,
};
Hint.defaultProps = {
    title: 'Hint'
};

export default Hint;