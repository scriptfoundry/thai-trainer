import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CategoryPicker from './CategoryPicker';

class Consonants extends Component {
    componentDidMount() {
        this.props.initializeConsonants();
    }
    componentWillUnmount() {
        this.props.clearSounds();
    }
    render() {
        const { consonantKeys, showConsonantsByKey, visibleConsonantKey } = this.props;
        return <div className="consonants">
            <h1>Consonants</h1>
            <CategoryPicker consonantKeys={ consonantKeys } showConsonantsByKey={ showConsonantsByKey } visibleConsonantKey={ visibleConsonantKey } />
        </div>;
    }
}

Consonants.propTypes = {
    clearSounds: PropTypes.func.isRequired,
    initializeConsonants: PropTypes.func.isRequired,
    consonants: PropTypes.object.isRequired,
    confusions: PropTypes.arrayOf(PropTypes.array).isRequired,
    consonantKeys: PropTypes.object.isRequired,
    consonantsLoaded: PropTypes.bool.isRequired,
    showConsonantsByKey: PropTypes.func.isRequired,
    visibleConsonantKey: PropTypes.string,
};
export default Consonants;