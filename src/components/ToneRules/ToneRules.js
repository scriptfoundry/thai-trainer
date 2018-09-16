import React from 'react';

const ToneRules = () => <div className="tone-rules">
    <h1>Tones</h1>

    <ul className="hint">
        Hint:
        <li>Consider learning mid-class syllables rules first. They aren&apos;t as frequent as low-class syllables, but they share several rules with the other class syllables.</li>
    </ul>

    <h2>Rules for syllables with no tone markers</h2>
    <table>
        <thead>
            <tr>
                <th></th>
                <th colSpan="3">Live</th>
                <th colSpan="3">Dead</th>
            </tr>
            <tr>
                <th></th>
                <th colSpan="3">Open + Long / Closed with Sonorant</th>
                <th>Open + short</th>
                <th>Closed + short</th>
                <th>Closed + long</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th className="high">High</th>
                <td colSpan="3">R</td>
                <td colSpan="3">L</td>
            </tr>
            <tr>
                <th className="mid">Mid</th>
                <td colSpan="3"></td>
                <td colSpan="3">L</td>
            </tr>
            <tr>
                <th className="low">Low</th>
                <td colSpan="3"></td>
                <td colSpan="2">H</td>
                <td>F</td>
            </tr>
        </tbody>
    </table>

    <h2>Rules for syllables with tone markers</h2>
    <table>
        <thead>
        <tr>
                <th></th>
                <th>อ่</th>
                <th>อ้</th>
                <th>อ๊</th>
                <th>อ๋</th>
            </tr>
            <tr>
                <th></th>
                <th>Mai ek</th>
                <th>Mai tho</th>
                <th>Mai tri</th>
                <th>Mai sattawa</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th className="high">High</th>
                <td>L</td>
                <td>F</td>
                <td><span role="img" aria-label="N/A">&#x1F6AB;</span></td>
                <td><span role="img" aria-label="N/A">&#x1F6AB;</span></td>
            </tr>
            <tr>
                <th className="mid">Mid</th>
                <td>L</td>
                <td>F</td>
                <td>H</td>
                <td>R</td>
            </tr>
            <tr>
                <th className="low">Low</th>
                <td>F</td>
                <td>H</td>
                <td><span role="img" aria-label="N/A">&#x1F6AB;</span></td>
                <td><span role="img" aria-label="N/A">&#x1F6AB;</span></td>
            </tr>
        </tbody>
    </table>
</div>;

export default ToneRules;