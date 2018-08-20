import React from 'react';
import PropTypes from 'prop-types';
import MainNavigation from './MainNavigation';
import BasicNavigation from './BasicsNavigation';

const Navigation = (props) => {
    const contents = props.currentView === 'basics' ?
        <BasicNavigation {...props} /> :
        <MainNavigation {...props} />;
        return <div className="navigation">
            {contents}
        </div>;
};

Navigation.propTypes = {
    changeView: PropTypes.func.isRequired,
    currentView: PropTypes.string.isRequired,
};

export default Navigation;