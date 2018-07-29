SPACED REPETITION:
0: [DEFAULT] add NOW
1: add 1 day
2: add 3 days
3: add 7 days
4: add 17 days
5: mark as mastered


[start app]
1. Load saved state
1. First time users gets something???
1. Show 
    a. If there are more than 5 outstanding words for test, show navigation for [test] and [practice selector]
    a. If there are outstanding/current practice decks, show navigation for [practice]
    a. Show word list


[show progress]
1. get all words and show:
    a. what's been mastered
    a. what's been practiced
    a. what's pending

[test]
1. Select 5 >= n <= 25 outstanding words (sort by overdue-ness)
1. Distribute all words into items of three types: reading, listening, translating
1. Randomize all items such that no 
1. For each item:
    1. Show challenge
    1. Randomly select ~10 possible answers + actual answer
    1. Randomize all answers
    1. Uncover all answers
    1. User selects an answer:
        1. mark item score += correct ? 1 : -1
1. For each item
    1. update word

[practice]
1. Automatically fill practice deck until there are $card_count cards
1. Show user list of cards in practice deck
    a. button to [start practice]
    a. button uncovers all words 
    a. user can add additional words
    a. if more than $card_count cards, user can remove words
1. 

[start practice]
1. build word list from 5 randomized lists of word ids
1. display button to [start test]
1. For each word
    a. if word shown 3 or fewer times
        a. show all aspects at once
    a. if word is shown more than 3 times
        a. show one random aspect
        a. prompt user with a second random aspect
        a. display second aspect and prompt user with last aspect
        a. display last aspect
