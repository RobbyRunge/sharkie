let canvas; // Main canvas element
let world; // Game world object
let keyboard = new Keyboard(); // Input handler
let intervalIds = []; // Array to store all interval IDs
let isGameActive = true; // New flag to track if game is active
let audioManager; // Audio manager instance

function checkOrientation() {
  let rotationMessage = document.getElementById('rotation_message');
  if (window.innerWidth < 720 && window.innerHeight > window.innerWidth) {
    rotationMessage.classList.remove('d_none');
  } else {
    rotationMessage.classList.add('d_none');
  }
}

// Check orientation on page load and when resizing
window.addEventListener('load', checkOrientation);
window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);

function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
  return id;
}

function init() {
  intervalIds = []; // Reset intervals array
  isGameActive = true; // Reset game state
  audioManager = new AudioManager();
  loadSounds();
  initLevel();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

function loadSounds() {
  audioManager.loadSound('background', 'audio/background_sound.mp3');
  audioManager.setVolume('background', 0.3);
  audioManager.playBackgroundMusic('background');
  audioManager.loadSound('game_over', 'audio/lose_sound.mp3');
  audioManager.loadSound('win', 'audio/win_sound.mp3');
  audioManager.loadSound('snoring', 'audio/snoring_sound.mp3');
  // audioManager.loadSound('movement', 'audio/underwater-movement-whoosh-4-186901.mp3'); // look again or for a better one
  audioManager.loadSound('slap', 'audio/fin_slap_sound.mp3');
  audioManager.loadSound('bubble_shoot', 'audio/bubble_shoot_sound.mp3');
  audioManager.loadSound('collect_coin', 'audio/collect_coin.mp3');
  audioManager.loadSound('use_coin', 'audio/use_coin.mp3');
  audioManager.loadSound('collect_bottle', 'audio/collect_bottle.mp3');
  audioManager.loadSound('die_enemie', 'audio/die_enemies.mp3');
  audioManager.loadSound('hit_by_bottle', 'audio/hit_by_bottle.mp3');
  audioManager.loadSound('hit_by_fin_slap', 'audio/hit_by_fin_slap.mp3');
  audioManager.loadSound('electric_shock', 'audio/electric_shock.mp3');
  audioManager.loadSound('normal_damage', 'audio/normal_damage.mp3');
}

document.addEventListener('DOMContentLoaded', function() {
  const soundIcon = document.getElementById('sound_icon');
  if (soundIcon) {
    soundIcon.addEventListener('click', toggleSound);
  }
});

function toggleSound() {
  if (!audioManager) return;
  const isMuted = audioManager.toggleMute();
  const soundIcon = document.getElementById('sound_icon');
  if (isMuted) {
    soundIcon.src = './img/assets/sound-off-svgrepo-com.svg';
  } else {
    soundIcon.src = './img/assets/sound-svgrepo-com.svg';
  }
}

function handleFullscreen() {
  const canvas = document.getElementById('game_container');
  if (!document.fullscreenElement) {
    openFullscreen(canvas);
  } else {
    closeFullscreen();
  }
}

function openFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

function closeFullscreen() {
  if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { 
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { 
      document.msExitFullscreen();
    }
  }
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