const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

const words =
  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure odit, tempore est blanditiis molestiae libero dolor necessitatibus quaerat obcaecati dicta?"
    .replace(/[,.?!:;]/g, "")
    .split(" ");

// Init word
let randomWord;

//Init score
let score = 0;

// Init time
let time = 10;

// Init difficulty
let difficulty = localStorage.getItem("difficulty") || "medium";

// Init "select" input
difficultySelect.value = difficulty;

// Focus on text on start
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Update time
function updateTime() {
  time--;
  timeEl.innerText = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);

    // end game
    gameOver();
  }
}

// Game over, show end screen
function gameOver() {
  endgameEl.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your final score is ${score}</p>
        <button onclick="location.reload()">Reload</button>
    `;

  endgameEl.style.display = "flex";
}

// Generate random word from array
function getRandomWord() {
  const index = Math.floor(Math.random() * words.length);
  return words[index];
}

// Add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();

  word.innerText = randomWord;
}

// Update score
function updateScore() {
  score++;
  scoreEl.innerText = score;
}

addWordToDOM();

// Event Listeners
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();
    e.target.value = "";

    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
});

// Settings button click
settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

// Settings select
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
