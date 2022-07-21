const gameContainer = document.getElementById("game");
let points = document.getElementById("score");
let hs = document.getElementById("HighScore");
hs.innerText = JSON.parse(localStorage.getItem('highScore'));
let score = 0;
let first = '';
let second = '';
let match =0;
let wait = 0;
points.innerText = 0;
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.classList.add('flipped');

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
  if(wait === 0){
  if(event.target.classList.contains('flipped') && first === ''){
  event.target.classList.toggle('flipped');
  first = event.target;
}
  if(event.target.classList.contains('flipped') && first !== ''){
  event.target.classList.toggle('flipped');
  second = event.target;
  if(first.classList.item(0) === second.classList.item(0)){
    match++;
    first = '';
    second = '';
    wait = 0;
  }
  else{
    wait = 1
    setTimeout(function(){
    first.classList.toggle('flipped');
    second.classList.toggle('flipped');
    first = '';
    second = '';
    wait = 0;}
    ,1000);
  }
  
  score++;
  points.innerText = score;
}
}
if(match === (shuffledColors.length)/2){
  if(score < JSON.parse(localStorage.getItem('highScore'))){
  localStorage.setItem('highScore',JSON.stringify(score));
  }
  if((JSON.parse(localStorage.getItem('highScore'))) === null){
    localStorage.setItem('highScore',JSON.stringify(score));
  }
  setTimeout(function(){
    alert("You Win!!!!");
  },200);
  hs.innerText = JSON.parse(localStorage.getItem('highScore'));
}
}
// when the DOM loads
createDivsForColors(shuffledColors);
