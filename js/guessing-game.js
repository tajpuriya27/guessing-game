/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/

function generateWinningNumber() {
  return Math.ceil(Math.random() * 100);
}

// Fisher- yates shuffle algorithm.
function shuffle(array) {
  var m = array.length,
    t,
    i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

class Game {
  constructor() {
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
    this.playerLife = 1;
  }

  difference() {
    return Math.abs(this.playersGuess - this.winningNumber);
  }

  isLower() {
    return this.playersGuess < this.winningNumber ? true : false;
  }

  checkGuess() {
    if (this.playersGuess === this.winningNumber) {
      return "You Win!";
    } else if (this.pastGuesses.includes(this.playersGuess)) {
      return "You have already guessed that number.";
    } else {
      this.pastGuesses.push(this.playersGuess);
    }

    let checkDiff = this.difference();
    if (checkDiff < 10) {
      return "You're burning up!";
    } else if (checkDiff < 25) {
      return "You're lukewarm.";
    } else if (checkDiff < 50) {
      return "You're a bit chilly.";
    } else {
      return "You're ice cold!";
    }
  }

  playersGuessSubmission(submittedNum) {
    this.playerLife++;
    if (this.playerLife <= 5) {
      if (
        submittedNum > 100 ||
        submittedNum < 1 ||
        typeof submittedNum !== "number"
      ) {
        throw "That is an invalid guess.";
      }
      this.playersGuess = submittedNum;
      return this.checkGuess();
    } else {
      return "You Lose.";
    }
  }

  provideHint() {
    let hintArr = [this.winningNumber];
    hintArr.push(generateWinningNumber());
    hintArr.push(generateWinningNumber());
    shuffle(hintArr);
    return hintArr;
  }
}

function newGame() {
  return new Game();
}
