import React from 'react';
import { Link } from 'react-router-dom';

const ConsonantNavigation = () => {
        return <div className="navigation">
            <h1>Thai Consonants</h1>
            <section>
                <Link className="button" to="/basics/consonants/review">Review consonants</Link>
            </section>
            <section>
                <Link className="button" to="/basics/consonants/confusion">Easily confused consonants</Link>
            </section>
            <section>
                <Link className="button" to="/basics/tones/classes">Consonant classes</Link>
            </section>
        </div>;
};

export default ConsonantNavigation;