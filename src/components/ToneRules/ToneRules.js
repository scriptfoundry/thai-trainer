import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Review from './Review';
import Drill from './Drill';

class ToneRules extends Component {
    componentDidMount() {
        this.props.initializeTones();
    }
    render() {
        const { match: { params: { stage } }, tonesmap } = this.props;

        return <div className="tone-rules">
            { stage === undefined ? <Review {...this.props} /> : null }
            { stage && tonesmap.length ? <Drill {...this.props} stage={parseInt(stage, 10)} /> : null }
        </div>;
    }
}

ToneRules.propTypes = {
    initializeTones: PropTypes.func.isRequired,
    match: PropTypes.shape({ params: PropTypes.object }),
    tonesmap: PropTypes.array.isRequired,
};

export default ToneRules;