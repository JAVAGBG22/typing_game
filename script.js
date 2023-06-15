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
// set focus on input element from start
text.focus();

// 1.
// generate random word from out words array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

//console.log(getRandomWord());

// 2.
// add the generated word to the DOM so we can see it in the browser
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
  //console.log(randomWord);
}

// 4.
// update the score if the word is correct
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// 6.
// create a timeinterval, 1000 is in milli seconds
const timeInterval = setInterval(updateTime, 1000);

// 7.
// update the time and count down from initial time. When time hits 0 it shoudl be game over
// therefor we need to clear the timeinterval and then call for gameOver()function
function updateTime() {
  time--;

  timeEl.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

// when time hits 0 its game over. We create some new HTML elements and also a button that reloads the game
// if we click it.
function gameOver() {
  endgameEl.innerHTML = `<h1>Time ran out!</h1> <p>Your final score is: ${score}</p> <button onClick="location.reload()">Reload</button>`;

  endgameEl.style.display = "flex";
}

// call for function to add word from array to DOM
addWordToDOM();

// 3.
// eventlisterner for our input field. We make the event listen to the input then we use the event parameter to get hold
// of the exact value that the user has typed
text.addEventListener("input", (event) => {
  const insertedText = event.target.value;

  // check if typed word is exactly the same as the random word
  if (insertedText === randomWord) {
    // if that is true add a new word to the DOM
    addWordToDOM();

    // and update the score
    updateScore();

    // we need to clear the input field otherwise we have to manually remove the old typed word
    event.target.value = "";

    // increase time based on what setting user chose
    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }

    // update the time
    updateTime();
  }
});

// eventlistener for our settings. This will listen to a change in the select options, again we grab the
// exact value by using the event parameter
settingsForm.addEventListener("change", (event) => {
  difficulty = event.target.value;

  // vi ska sätta difficulty i localstorage
  // vi ska fixa så att man kan sätta en difficulty efter sommaren
});
