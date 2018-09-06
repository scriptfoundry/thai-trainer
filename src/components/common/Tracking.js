import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { operations } from '../../store';

class Tracking extends Component {
    componentDidUpdate(prevProps) {
        const { trackRouteChange, location: { pathname } } = this.props;
        const { location: { pathname: oldPathname }} = prevProps;

        if (pathname !== oldPathname) trackRouteChange(pathname);
    }

    render() {
        return null;
    }
}

Tracking.propTypes = {
    location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
    trackRouteChange: PropTypes.func.isRequired,
};

export default connect(null, operations)(Tracking);