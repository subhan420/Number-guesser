let mode = "easy";
let max = 30;

let secret = Math.trunc(Math.random() * max) + 1;
let score = 20;
let highscore = 0;

const numBox = document.querySelector(".number-box");
const input = document.querySelector(".guess-input");
const msg = document.querySelector(".status-msg");
const scoreEl = document.querySelectorAll(".score-line")[0];
const hiEl = document.querySelectorAll(".score-line")[1];

function updateScore() {
  scoreEl.innerHTML = `<span class="dot dot-heart"></span> Score: ${score}`;
  hiEl.innerHTML = `<span class="dot dot-star"></span> Highscore: ${highscore}`;
}

function checkGuess() {
  const guess = Number(input.value);

  if (!guess) {
    msg.textContent = "No number!";
    return;
  }

  if (guess < 1 || guess > max) {
    msg.textContent = `Please enter a number between 1 and ${max}!`;
    return;
  }

  if (guess === secret) {
    numBox.textContent = secret;
    numBox.style.background = "#4c9";
    msg.textContent = "Correct number!";

    if (score > highscore) {
      highscore = score;
    }

    updateScore();
    return;
  }

  if (score > 1) {
    msg.textContent = guess > secret ? `Lower than ${guess}` : `Higher than ${guess}`;
    score--;
    updateScore();
  } else {
    msg.textContent = "You lost!";
    score = 0;
    numBox.textContent = secret;
    numBox.style.background = "#FF0000";
    updateScore();
  }
}

function changeMode() {
  if (mode === "easy") {
    mode = "hard";
    max = 100;
    score = 10;

    document.querySelector(".hint").textContent = "(Between 1 and 100)";
    document.querySelector(".btn-mode span").textContent = "Hard";
    input.setAttribute("max", "100");
  } else {
    mode = "easy";
    max = 30;
    score = 20;

    document.querySelector(".hint").textContent = "(Between 1 and 30)";
    document.querySelector(".btn-mode span").textContent = "Easy";
    input.setAttribute("max", "30");
  }

  secret = Math.trunc(Math.random() * max) + 1;
  numBox.textContent = "?";
  numBox.style.background = "#eee";
  msg.textContent = "Start guessing...";

  updateScore();
}

document.querySelector(".btn-check").addEventListener("click", checkGuess);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkGuess();
  }
});

document.querySelector(".btn-again").addEventListener("click", () => {
  secret = Math.trunc(Math.random() * max) + 1;
  score = mode === "easy" ? 20 : 10;

  numBox.textContent = "?";
  numBox.style.background = "#eee";
  msg.textContent = "Start guessing...";
  input.value = "";

  updateScore();
});

document.querySelector(".btn-change-mode").addEventListener("click", changeMode);