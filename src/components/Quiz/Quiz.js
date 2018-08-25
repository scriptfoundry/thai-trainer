import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Challenge from './Challenge';
import Progress from './Progress';

const Quiz = (props) => {
    return <div className="test">
        <TransitionGroup className="content">
            <CSSTransition timeout={400} key={ props.index } classNames="challenge-container">
                <Challenge key={ props.index } {...props} />
            </CSSTransition>
        </TransitionGroup>
        <Progress {...props} />
    </div>;

};

Quiz.propTypes = {
    index: PropTypes.number.isRequired,
};
export default Quiz;