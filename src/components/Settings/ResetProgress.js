import React from 'react';
import PropTypes from 'prop-types';
import { classNames } from '../../services/Utils';

const ResetProgress = ({ resetProgress, toggleResetProgress, resetProgressVisible }) => {
    const modalClassNames = classNames({
        modal: true,
        visible: resetProgressVisible
    });

    return <div className="reset-progress">
        <h2>Reset</h2>
        <div className="button-group">
            <div className="danger" onClick={ toggleResetProgress }>Reset progress</div>
        </div>
        <p>Be careful! Resetting your progress will be like starting all tests from scratch.</p>

        <div className={ modalClassNames }>
            <div className="bg" onClick={ toggleResetProgress }></div>
            <div className="fg">
                <h3>Reset progress?</h3>
                <div>
                    <button onClick={ toggleResetProgress }>Cancel</button>
                    <button className="danger" onClick={ resetProgress }>Reset progress</button>
                </div>
            </div>
        </div>
    </div>;
};

ResetProgress.propTypes = {
    toggleResetProgress: PropTypes.func.isRequired,
    resetProgress: PropTypes.func.isRequired,
    resetProgressVisible: PropTypes.bool.isRequired,
};

export default ResetProgress;