import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class ScrollReset extends Component {
    componentDidUpdate(prev) {
        if (this.props.location !== prev.location) window.scrollTo(0, 0);
    }
    render() {
        return this.props.children;
    }
}

ScrollReset.propTypes = {
    location: PropTypes.object.isRequired,
    children: PropTypes.array,
};

export default withRouter(ScrollReset);