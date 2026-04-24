const secret = Math.trunc(Math.random() * 100) + 1;
let score = 20;
let highscore = 0;

const numBox = document.querySelector(".number-box");
const input = document.querySelector(".guess-input");
const msg = document.querySelector(".status-msg");
const scoreEl = document.querySelector(".score-line:nth-child(2)");
const hiEl = document.querySelector(".score-line:nth-child(3)");

function updateScore() {
  scoreEl.innerHTML = `<span class="dot dot-heart"></span> Score: ${score}`;
  hiEl.innerHTML = `<span class="dot dot-star"></span> Highscore: ${highscore}`;
}

document.querySelector(".btn-check").addEventListener("click", () => {
  const guess = Number(input.value);

  if (!guess) {
    msg.textContent = "No number!";
    return;
  }

if (guess < 1 || guess > 100) {
  msg.textContent = "Please enter a number between 1 and 100!";
  return;
}

  if (guess == secret) {
    numBox.textContent = secret;
    numBox.style.background = "#4c9";
    msg.textContent = "Correct number!";
    if (score > highscore) {
      highscore = score;
    }
    updateScore();
  } else if (guess > secret) {
    msg.textContent = "Too high!";
    score--;
    updateScore();
  } else {
    msg.textContent = "Too low!";
    score--;
    updateScore();
  }

  if (score < 1) {
    msg.textContent = "You lost!";
    score = 0;
    updateScore();
    numBox.textContent = secret;
    numBox.style.background = "#4c9";
  }
});

document.querySelector(".btn-again").addEventListener("click", () => {
  location.reload();
});
