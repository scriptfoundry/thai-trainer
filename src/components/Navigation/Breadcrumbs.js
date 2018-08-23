import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route, withRouter } from 'react-router-dom';
import BreadcrumbsItem, { urlToTitle } from './BreadcrumbsItem';

const Breadcrumbs = ({ location: { pathname } }) => {
    if (pathname === '/' || !urlToTitle(pathname)) return null;

    return <div className="breadcrumbs">
        <ul className='container'>
            <li><Link to="/">Home</Link></li>
            <Route path='/:path' component={BreadcrumbsItem} />
        </ul>
    </div>;
};
Breadcrumbs.propTypes = {
    location: PropTypes.shape({ location: PropTypes.object }),
};


export default withRouter(Breadcrumbs);