import React from 'react';
import { Link } from 'react-router-dom';

const ToneNavigation = () => {
        return <div className="navigation">
            <h1>Thai Tones</h1>
            <section>
                <Link className="button" to="/basics/tones/classes">Consonant classes</Link>
            </section>
            <section>
                <Link className="button" to="/basics/tones/rules">Tone rules</Link>
            </section>
        </div>;
};

export default ToneNavigation;