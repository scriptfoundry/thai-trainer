import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class VowelButton extends PureComponent {
    constructor(...args) {
        super(...args);
        this.onClick = this.onClick.bind(this);
    }
    onClick({ target }) {
        const { onClick } = this.props;
        target.blur();
        onClick();
    }
    render() {
        const { vowel, visibleVowel } = this.props;
        return <button className={ vowel === visibleVowel ? 'selected' : null } onClick={ this.onClick }>{vowel.vowel}</button>;
    }
}

VowelButton.propTypes = {
    vowel: PropTypes.shape({ vowel: PropTypes.string.isRequired }).isRequired,
    visibleVowel: PropTypes.object,
    onClick: PropTypes.func.isRequired,
};

export default VowelButton;