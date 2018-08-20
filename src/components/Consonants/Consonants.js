import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CategoryPicker from './CategoryPicker';
import ConsonantList from './ConsonantList';

class Consonants extends Component {
    componentDidMount() {
        this.props.initializeConsonants();
    }
    componentWillUnmount() {
        this.props.clearSounds();
    }
    render() {
        const { consonants, consonantKeys, showConsonantsByKey, pronunciationType, visibleConsonantKey } = this.props;
        return <div className="consonants">
            <h1>Consonants</h1>
            <CategoryPicker consonantKeys={ consonantKeys } showConsonantsByKey={ showConsonantsByKey } visibleConsonantKey={ visibleConsonantKey } />
            { visibleConsonantKey ? <ConsonantList consonants={ consonants } consonantKeys={ consonantKeys } pronunciationType={pronunciationType} visibleConsonantKey={ visibleConsonantKey } /> : null }
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
    pronunciationType: PropTypes.string.isRequired,
    showConsonantsByKey: PropTypes.func.isRequired,
    visibleConsonantKey: PropTypes.string,
};
export default Consonants;