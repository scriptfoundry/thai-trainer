import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Challenge from './Challenge';

const Test = (props) => {
    return <div className="test">
        <TransitionGroup className="content">
            <CSSTransition timeout={400} key={ props.index } classNames="challenge-container">
                <Challenge key={ props.index } {...props} />
            </CSSTransition>
        </TransitionGroup>
    </div>;

};

Test.propTypes = {
    index: PropTypes.number.isRequired,
};
export default Test;