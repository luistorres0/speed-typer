const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game");
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

// Generate random word from array
function getRandomWord() {
  const index = Math.floor(Math.random() * words.length);
  return words[index];
}

// Add word to DOM
function addWordToDOM(){
    randomWord = getRandomWord();

    word.innerText = randomWord;
}

// Update score
function updateScore(){
    score++;
    scoreEl.innerText = score;
}

addWordToDOM();

// Event Listeners
text.addEventListener("input", (e) => {
    const insertedText = e.target.value;

    if(insertedText === randomWord){
        addWordToDOM();
        updateScore();
        e.target.value = "";
    }
})