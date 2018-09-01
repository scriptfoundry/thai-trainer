# Thai language learning assistant

This is a simple application to aid in learning written Thai language.

It can be used online currently at https://thai.fatfx.com/

## Who is this for?

To be honest, it is for me. There are plenty of decent online tools out there, I guess, but I was completely unsatisfied with what I could find for cracking my Thai illiteracy. What I wanted was something for brute-forcing my way into written Thai -- enough to be able to stop using Anglicised-only learning resources and maybe be able to read a bus schedule, menu or traffic sign. That said, I think this might help someone with absolutely no knowledge of the Thai writing system.

## Features:

1. Gradual, example-based introduction to the written Thai language, focusing on shorter, simple words, while also building up a decent survival vocabulary.
1. Testing that uses [spaced repetition](https://en.wikipedia.org/wiki/Spaced_repetition) (specifically a variation of the [Leitner System](https://en.wikipedia.org/wiki/Leitner_system)) to reinforce new vocabulary.
1. Text-to-Speech using system- and browser-based [Web SpeechSynthesis API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis). 
1. Multiple ways to introduce and practice new vocabulary, including:
    1. Voice-first mode. Close your eyes and press keys to proceed through the new vocabulary.
    1. Card-mode. This is a more familiar flash-card style where Thai spelling, pronunciation and meaning are unveiled step-by-step, according to your preferences.
1. A curated "Thai basics" section, that help illustrate all common Thai vowels and diphthongs and unravel easily confused Thai consonants.
1. Flexible settings that allow users to customise their learning environment.

## Requirements
1. In order to use this application, your local system must have Thai language support installed. 
    1. You must be able to view Thai web pages natively in a web browser, such as Firefox or Chrome -- a good way to test is to go to [Wikipedia's Thai portal](https://th.wikipedia.org/wiki/%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B8%AB%E0%B8%A5%E0%B8%B1%E0%B8%81).
    1. You must also have at least one Thai text-to-speech voice agent.
    1. Please consult the documentation for your operating system (e.g. for [Windows](https://support.office.com/en-us/article/how-to-download-text-to-speech-languages-for-windows-10-d5a6b612-b3ae-423f-afa5-4f6caf1ec5d3) and [OS X](https://support.apple.com/kb/ph25311?locale=en_US) for instructions on how to instal this if you do not already have it.)
1. Future versions of this app may not require native Thai text-to-speech capabilities, but it will require a very large sound file to be loaded each time the page is loaded. I may add this feature after I know that the words are unlikely to change.
1. This app does not currently work on mobile.

## Credits
This project would be completely useless without the I.P.A and Paiboon Thai transliterations, used with the kind permission of the outstanding resource, [thai-language.com](http://www.thai-language.com/default.aspx). Any mistakes found in this application will most likely be a copying error of mine, not a factual error of theirs. Please direct any corrections to me only.

I would also like to highlight the use of the [fast-levenshtein Levenshtein distance module](https://github.com/hiddentao/fast-levenshtein) here in making tests extremely challenging with minimal preparation (is [10 lines of code](https://github.com/scriptfoundry/thai-trainer/blob/df0a7e74ac73c3b07e63acd1f6dcfb6758bc796f/src/services/Utils.js#L95) small enough?).

## Contributing

If you encounter any errors or have suggestions, please open an issue or fork and send me a pull request.

If you do want to contribute and wish to run this on your own system, you must have `node` and `npm` / `yarn` installed locally.

    git clone github.com:scriptfoundry/thai-trainer.git
    cd thai-trainer
    yarn install
    yarn start

To run tests:

    yarn run test

To compile Sass to CSS during development:

    yarn run css # run once
    yarn run css:watch # watches for changes -- you can run this at the same time as `yarn start`

To build the production version of the application:

    yarn run css:build
    yarn build


## Other notes

I have to acknowledge that relying on text-to-speech is a bit risky. Just as an English text-to-speech system may occasionally mispronounce a word, a system's Thai text-to-speech system is just as likely to makes mistakes. In this case, it really pays to check the phonemic transliterations, as they are more likely to be correct. If you do encounter a TTS pronunciation mistake, please log an issue and I'll see if it can be addressed somehow (though probably the only safe option is to remove the word entirely.)

This was my first large project using [Redux](https://redux.js.org/). Project structure is heavily influenced by the [Re-ducks](https://github.com/alexnm/re-ducks) approach, in particular its use of `operations` as the primary initiator of state change. As time permits, I will attempt to write tests for all reducers and operations, but currently only the scripts in `/src/services/` are backed by tests.