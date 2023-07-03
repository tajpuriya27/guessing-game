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
    this.playerLife = 5;
  }

  difference() {
    return Math.abs(this.playersGuess - this.winningNumber);
  }

  isLower() {
    return this.playersGuess < this.winningNumber ? true : false;
  }

  // this message is shown in title-msg
  checkGuess() {
    if (this.playersGuess === this.winningNumber) {
      --this.playerLife;
      this.pastGuesses.push(this.playersGuess);
      return "You Win!";
    } else if (this.pastGuesses.includes(this.playersGuess)) {
      return "You have already guessed that number.";
    } else {
      --this.playerLife;
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
    if (this.playerLife === 1 && !this.pastGuesses.includes(submittedNum)) {
      --this.playerLife;
      this.playersGuess = submittedNum;
      this.pastGuesses.push(this.playersGuess);
      return "You Lose.";
    }

    if (
      submittedNum > 100 ||
      submittedNum < 1 ||
      typeof submittedNum !== "number"
    ) {
      titleMsg.innerText = "Please Input number between 1-100.";
      document.getElementById("num-input").value = "";
      throw "That is an invalid guess..";
    } else {
      this.playersGuess = submittedNum;
      return this.checkGuess();
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

// Jasmine shows some  error at line 87. Need to check.

// let game = new Game();
// console.log(game.playersGuessSubmission(101));

// DOM part
let game = new Game();

// unique selectors
const titleMsg = document.getElementById("title-msg");
const guessMsg = document.getElementById("guess-msg");
const submitClick = document.getElementById("submit-btn");
const listItem = document.getElementById("list-items").children;
const resetClick = document.getElementById("reset-btn");

// Handling Reset.
resetClick.addEventListener("click", resetFun);
function resetFun() {
  for (let i = 0; i < listItem.length; ++i) {
    listItem[i].innerText = "";
  }
  game = newGame();
  document.getElementById("num-input").value = "";
}

// Handling click
submitClick.addEventListener("click", clickFun);
function clickFun() {
  const guessedNum = Number(document.getElementById("num-input").value);
  titleMsg.innerHTML = game.playersGuessSubmission(guessedNum);

  document.getElementById("num-input").value = "";

  for (let i = 0; i < game.pastGuesses.length; ++i) {
    if (game.pastGuesses[i]) {
      listItem[i].innerText = game.pastGuesses[i];
    }
  }

  setTimeout(() => {
    guessMsg.innerHTML =
      guessedNum < game.winningNumber
        ? "Guess Higher!"
        : guessedNum === game.winningNumber
        ? "You Win!"
        : "Guess Lower!";
  }, "1000");

  setTimeout(() => {
    guessMsg.innerHTML = "Guess a number between 1-100";
  }, "2000");
}

// Hint button logic
const hintBtn = document.getElementById("hint-btn");
hintBtn.addEventListener("click", hintFun);
function hintFun() {
  titleMsg.innerHTML = `The hints for the game is [${game.provideHint()}]`;
}
