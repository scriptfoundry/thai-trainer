import React from 'react';
import PropTypes from 'prop-types';
import Thai from '../common/ColorizedThai';

const CharacterClassToggle = ({ onToggle, showCharacterClasses }) => <div>
    <h2>Practice hints</h2>

    <div className="button-group">
        <div onClick={ showCharacterClasses ? null : onToggle } className={`toggle-header ${ showCharacterClasses ? 'selected' : ''}`}>Color character class</div>
        <div onClick={ showCharacterClasses ? onToggle : null } className={`toggle-header ${ !showCharacterClasses ? 'selected' : ''}`}>No color</div>
    </div>
    <div>
        <h3>
            { showCharacterClasses ? <Thai word={{ thai: 'หยำเป' }} /> : 'หยำเป'}
        </h3>
    </div>
</div>;

CharacterClassToggle.propTypes = {
    onToggle: PropTypes.func.isRequired,
    showCharacterClasses: PropTypes.bool.isRequired,
};

export default CharacterClassToggle;