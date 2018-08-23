import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
        return <div className="navigation">
            <h1>Thai Basics</h1>
            <section>
                <Link className="button" to="/basics/vowels">Review vowels</Link>
            </section>
            <section>
                <Link className="button" to="/basics/consonants">Review consonants</Link>
            </section>
            <section>
                <Link className="button" to="/basics/consonantconfusion">Easily confused consonants</Link>
            </section>
        </div>;
};

export default Navigation;