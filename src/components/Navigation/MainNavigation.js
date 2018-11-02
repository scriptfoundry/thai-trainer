import React from 'react';
import { Link } from 'react-router-dom';

const MainNavigation = () => {
        return <div className="navigation">
            <h1>Read Thai</h1>
            <section>
                <Link className="button" to="/basics">The basics</Link>
            </section>
            <section>
                <Link className="button" to="/practice">Practice words</Link>
            </section>
            <section>
                <Link className="button" to="/test">Test words</Link>
            </section>
            <section>
                <Link className="button" to="/progress">View progress</Link>
            </section>
            <section>
                <Link className="button" to="/settings">Settings</Link>
            </section>
        </div>;
};

export default MainNavigation;