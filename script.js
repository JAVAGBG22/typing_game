const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const settingsBtn = document.getElementById("settings-btn");
const difficultySelect = document.getElementById("difficulty");

const words = [
  "dependent",
  "dog",
  "superficial",
  "admit",
  "juice",
  "javascript",
  "developer",
  "airplane",
  "great",
  "fun",
  "manipulate",
  "cat",
  "transition",
  "school",
  "computer",
  "programming",
  "drag",
  "loving",
  "north",
];

/**
 1. generera ett slumpat ord ifrån vår array
 2. se till att visa det ordet i browsern, kort sagt lägga till det i DOM
 3. nåt typ av event för att komma åt textelementet som visar vårt random ord
 4. kolla om det är rätt svar och uppdatera score
 5. se till att input är focused från start
 6. vi måste ha en timer som räknar ner
 7. uppdatera tiden beroende på svar
 8. skapa game over när tiden rinner ut
 9. nån typ av settings knapp för svårighetsgrad
 10. samt att vi kan selecta önskad setting
 11. kommer att spara inställningar i localstorage
 */

// init word
let randomWord;

// init score
let score = 0;

// init time
let time = 10;

// 5.
text.focus();

// 1.
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

//console.log(getRandomWord());

// 2.
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
  //console.log(randomWord);
}

// 4.
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// 6.
const timeInterval = setInterval(updateTime, 1000);

// 7.
function updateTime() {
  time--;

  timeEl.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

function gameOver() {
  endgameEl.innerHTML = `<h1>Time ran out!</h1> <p>Your final score is: ${score}</p> <button onClick="location.reload()">Reload</button>`;

  endgameEl.style.display = "flex";
}

addWordToDOM();

// 3.
text.addEventListener("input", (event) => {
  const insertedText = event.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();

    updateScore();

    event.target.value = "";

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

settingsForm.addEventListener("change", (event) => {
  difficulty = event.target.value;

  // vi ska sätta difficulty i localstorage
  // vi ska fixa så att man kan sätta en difficulty efter sommaren
});
