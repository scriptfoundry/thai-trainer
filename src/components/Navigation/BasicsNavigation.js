import React from 'react';
import { Link } from 'react-router-dom';

const BasicNavigation = () => {
        return <div className="navigation">
            <h1>Thai Basics</h1>
            <section>
                <Link className="button" to="/basics/vowels">Thai vowels</Link>
            </section>
            <section>
                <Link className="button" to="/basics/consonants">Thai consonants</Link>
            </section>
            <section>
                <Link className="button" to="/basics/tones">Thai tones</Link>
            </section>
        </div>;
};

export default BasicNavigation;