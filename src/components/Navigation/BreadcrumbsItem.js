import React, { Fragment } from 'react';
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const urlToTitle = url => {
    return {
        '/': 'Home',
        '/basics': 'Basics',
        '/basics/vowels': 'Vowels',
        '/basics/consonants': 'Consonants',
        '/basics/consonantconfusion': 'Easily confused consonants',
        '/practice': 'Practice Words',
        '/test': 'Test',
        '/test/overdue': 'Scheduled words',
        '/test/current': 'Practice words',
        '/progress': 'Progress',
        '/settings': 'Settings',
    }[url] || null;
};

const BreadcrumbsItem = ({ location: { pathname }, match }) => {
    const title = urlToTitle(match.url);

    return <Fragment>
        <li className={match.isExact ? 'breadcrumb-active' : undefined}>
        ⟫ { pathname === match.url ? <span>{ title }</span> : <Link to={match.url || ''}>{ title }</Link> }
        </li>
        <Route path={`${match.url}/:path`} component={BreadcrumbsItem} />
    </Fragment>;
};

BreadcrumbsItem.propTypes = {
    location: PropTypes.shape({ pathname: PropTypes.string }),
    match: PropTypes.object.isRequired
};

export default BreadcrumbsItem;