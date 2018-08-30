import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ConfusionPicker from './ConfusionPicker';
import ConfusionDetail from './ConfusionDetail';
import Drill from './Drill';

class Confusion extends Component {
    componentDidMount() {
        this.props.initializeConfusion();
    }
    componentWillUnmount() {
        this.props.clearSounds();
    }

    render() {
        const { confusions, visibleConfusion, showConfusionByIndex, confusionLoaded, match: { params={} } } = this.props;

        if (confusions.length === 0) return null;
        if (!isNaN(params.visibleConfusion)) return <Drill { ...this.props } />;

        return <div className="confusion">
            <h1>Easily confused consonants</h1>
            <ConfusionPicker confusions={ confusions } visibleConfusion={ visibleConfusion } showConfusionByIndex={ showConfusionByIndex } />

            { confusionLoaded ? <ConfusionDetail { ...this.props } /> : null }
        </div>;
    }
}

Confusion.propTypes = {
    confusionLoaded: PropTypes.bool.isRequired,
    confusions: PropTypes.array,
    match: PropTypes.shape({ params: PropTypes.object }).isRequired,
    visibleConfusion: PropTypes.number,

    clearSounds: PropTypes.func.isRequired,
    initializeConfusion: PropTypes.func.isRequired,
    showConfusionByIndex: PropTypes.func.isRequired,
};
export default Confusion;