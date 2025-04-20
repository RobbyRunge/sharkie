let canvas; // Main canvas element
let world; // Game world object
let keyboard = new Keyboard(); // Input handler
let intervalIds = []; // Array to store all interval IDs
let isGameActive = true; // New flag to track if game is active

function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
  return id;
}

function init() {
  // Initialize game by creating world with canvas and keyboard
  intervalIds = []; // Reset intervals array
  isGameActive = true; // Reset game state
  initLevel();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

// Event listeners for keydown events - set corresponding keyboard properties to true
window.addEventListener('keydown', (event => {  
  switch(event.code) {
    case 'ArrowLeft':
      keyboard.LEFT = true;
      break;
    case 'ArrowRight':
      keyboard.RIGHT = true;
      break;
    case 'ArrowUp':
      keyboard.UP = true;
      break;
    case 'ArrowDown':
      keyboard.DOWN = true;
      break;
    case 'Space':
      keyboard.SPACE = true;
      break;
    case 'KeyD':
      keyboard.D = true;
      break;
    case 'KeyE':
      keyboard.E = true;
      break;
  }
}));

// Event listeners for keyup events - set corresponding keyboard properties to false
window.addEventListener('keyup', (event => {
  switch(event.code) {
    case 'ArrowLeft':
      keyboard.LEFT = false;
      break;
    case 'ArrowRight':
      keyboard.RIGHT = false;
      break;
    case 'ArrowUp':
      keyboard.UP = false;
      break;
    case 'ArrowDown':
      keyboard.DOWN = false;
      break;
    case 'Space':
      keyboard.SPACE = false;
      break;
    case 'KeyD':
      keyboard.D = false;
      break;
    case 'KeyE':
      keyboard.E = false;
      break;
  }
}));