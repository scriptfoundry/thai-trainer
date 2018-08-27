# Thai language learning assistant

This is a simple application to aid in learning written Thai language.

It can be used online currently at https://thai.fatfx.com/

## Who is this for?

This is genuinely difficult to answer. My sense is that this will probably work best for those who have already tried to make sense of the Thai language using other tools, but still can't read. I built this simply as a brute-force, rote practice tool for learning how Thai characters are used in real life. Bypassing the typical focus on rules and logic, I wanted to focus on giving the learner enough examples of basic Thai words that the rules of written Thai become obvious on their own. In my own experience, this seems to be working pretty well. But obviously... milage may vary.

## Features:

1. Gradual, example-based introduction to the written Thai language, focusing on simple words and first, while also building up a decent survival vocabulary.
1. Text-to-Speech using the browser-based [Web SpeechSynthesis API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis). In order to use this application, your local system must have Thai language support installed, including Thai text-to-speech. Please consult the documentation for your operating system (e.g. for [Windows](https://support.office.com/en-us/article/how-to-download-text-to-speech-languages-for-windows-10-d5a6b612-b3ae-423f-afa5-4f6caf1ec5d3) and [OS X](https://support.apple.com/kb/ph25311?locale=en_US) for instructions on how to instal this if you do not already have it.)
1. Multiple ways to introduce and practice new vocabulary, including:
    1. Voice-first mode. Close your eyes and press the space-bar to proceed through the new vocabulary.
    1. Card-mode. This is a more familiar flash-card style where Thai spelling, pronunciation and meaning are unveiled step-by-step, according to your preferences.
1. Challenging tests that confirm you've mastered a word's correct meaning, pronunciation and spelling.
1. Testing that uses [spaced repetition](https://en.wikipedia.org/wiki/Spaced_repetition) (specifically a variation of the [Leitner System](https://en.wikipedia.org/wiki/Leitner_system)) to reinforce new vocabulary.
1. A highly curated "Thai basics" section, that help illustrate all common Thai vowels and dipthongs and unravel easily confused Thai consonants.
1. Flexible settings that allow users to customise their learning environment.

## Credits

This project simply would not be possible without the phonemic Thai transliterations, used with the kind permission of ______, [thai-language.com](http://www.thai-language.com/default.aspx)

## Contributing

If you encounter any errors or have suggestions, please open an issue. I want to keep this application as simple as possible, but all reasonable pull request will be gratefully considered.

## Other notes

Relying on text-to-speech is a bit risky. Just as an English text-to-speech system may occasionally mispronounce a word, it is also reasonable to expect your system's Thai text-to-speech system to makes mistakes. In this case, it really pays to check the phonemic transliterations, as they are more likely to be correct. If you do encounter a mistake, please log an issue and I'll see if it can be addressed somehow (though probably the only safe option is to remove the word entirely.)

This was my first large project using [Redux](https://redux.js.org/). It is heavily influenced by the [Re-ducks](https://github.com/alexnm/re-ducks) pattern, in particular its use of `operations` as the primary initiator of state change, rather than `action creators`.