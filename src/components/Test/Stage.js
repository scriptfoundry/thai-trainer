import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Challenge from './Challenge';

const Stage = (props) => {
    return <div className="stage">
        <button onClick={ () => props.changeView('navigation') }>Back</button>
        <TransitionGroup>
            <CSSTransition timeout={300} classNames="challenge">
                <Challenge key={ props.index } {...props} />
            </CSSTransition>
        </TransitionGroup>
    </div>;

};

Stage.propTypes = {
    index: PropTypes.number.isRequired,
    changeView: PropTypes.func.isRequired,
};
export default Stage;