import React from 'react';
import PropTypes from 'prop-types';

function leave(evt, url) {
    evt.preventDefault();
    window.open(url, 'external');
}
const OutboundLink = ({ url, children }) => <a href={ url } onClick={ (evt) => leave(evt, url) } >{ children }</a>;

OutboundLink.propTypes = {
    url: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired
};

export default OutboundLink;