# Totally Rad Coding Quiz

## Description

I created this site to practice my web API knowledge. After learning about the DOM, events, and client-side storage, I decided to put my learnings to practical use. Creating a quiz is helpful in that respect, but it'll also help me stay sharp on these concepts in the coming weeks. I purposefully made the questions relevant to the topics mentioned above. I plan to revisit this quiz when I'm preparing for interviews or just need to freshen up on web APIs.

I found this project to be the most difficult one yet. Concepts like appending divs to the DOM or the bubbling effect didn't click initially. This project contains the most code I've written thus far, and the time and effort behind this project helped me grasp these important lessons.

## Table of Contents (Optional)

If your README is long, add a table of contents to make it easy for users to find what they need.

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

This repository is being hosted on GitHub pages: 
https://ericlyn4s.github.io/totally-rad-coding-quiz/

The repository can also be cloned on GitHub: 
https://github.com/ericlyn4s/totally-rad-coding-quiz

## Usage

The starting layout provides instructions and a button to initiate the quiz. When the user hits 'Start Quiz', they're presented with the first question and four possible answers. After selecting an answer, the footer informs the user if they were correct or incorrect, and the next question/answer set is loaded to the screen. 

<image src="assets/images/first-question.png" alt="A question reads 'Which of the following would change an element's background to red?', and four answers are provided below. A timer counts down in the top righthand corner, and a link reading 'View Highscores' is in the top lefthand corner." width="450" style="border: .5px solid;"/>

Additionally, a timer is displayed in the upper righthand corner and counts down from 120 seconds. If the user answers a question incorrectly, 10 seconds are deducted from the timer. The quiz ends when either (1) all questions have been answered or (2) the timer runs out. At game completion, the user is given their score and prompted to enter their initials. When the user hits 'submit', their initials and score are added to the high scores list. 

<image src="assets/images/game-over.png" alt="Along with the 'View Highscores' and timer element in the header, the page shows 'All Done! Your final score is:' along with the user's score, then 'Enter your intials:' and a field for the user to input his or her intials." width = "450" style="border: .5px solid;" />

This list is loaded next, which shows all user scores thus far. From this page, the user can hit the 'Go Back' button to restart the quiz, or the 'Clear High Scores' list to clear all entries from the high scores list. Finally, this high scores list can be accessed at any point from the upper lefthand corner should the user click the 'View Highscores' link.

<image src="assets/images/high-scores.png" alt="Along with the 'View Highscores' and timer element in the header, the page shows a list of all user scores thus far. It shows the user's intials followed by their score, with two buttons at the bottom: 'Go Back' and 'Clear High Scores'." width="450" style="border: .5px solid;"/>

## Credits

For the question and answers, I used those provided by 2U as part of the interview prep section of their 'Week 4 Weekly Wrap-Up' page. The original quiz can be accessed here:
https://docs.google.com/forms/d/e/1FAIpQLScpN6BRKxiXR-JDf0_5CJY0d1zu66_2FTw4A39vwBgDqdZA6w/viewscore?viewscore=AE0zAgCvrjYM8nkLT4RC2VbRxf6xd07zBtsZWaJciANBChvSZ2YqwklbHvWKNIHIuQ

I had tutor sessions with Scott Everett on 11/14/2023 and 11/21/2023.

## License

MIT License

Copyright (c) 2023 Eric Peterson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
