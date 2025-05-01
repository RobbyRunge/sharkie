let canvas; 
let world; 
let keyboard;
let intervalIds = []; 
let isGameActive = true; 
let audioManager; 

/**
 * Checks device orientation and displays a rotation message on mobile devices in portrait mode
 * Shows a message when screen width is less than 720px and height is greater than width
 */
function checkOrientation() {
  let rotationMessage = document.getElementById('rotation_message');
  if (window.innerWidth < 720 && window.innerHeight > window.innerWidth) {
    rotationMessage.classList.remove('d_none');
  } else {
    rotationMessage.classList.add('d_none');
  }
}

window.addEventListener('load', checkOrientation);
window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);

/**
 * Creates an interval that can be stopped later
 * @param {Function} fn - Function to execute at each interval
 * @param {number} time - Time between executions in milliseconds
 * @returns {number} The interval ID
 */
function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
  return id;
}

/**
 * Initializes the game by setting up all required components
 * Creates audio manager, keyboard handler, loads sounds, initializes level and world
 */
function init() {
  intervalIds = []; 
  isGameActive = true;
  audioManager = new AudioManager();
  keyboard = new GameKeyboard();
  loadSounds();
  initLevel();
  handleFullscreen();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  updateSoundIconDisplay();
}

/**
 * Updates the sound icon appearance based on the current mute state
 * Changes the icon between sound-on and sound-off SVG images
 * Used on initialization and after toggling sound state
 * @returns {void}
 */
function updateSoundIconDisplay() {
  const soundIcon = document.getElementById('sound_icon');
  if (soundIcon && audioManager && audioManager.isMuted) {
    soundIcon.src = './img/assets/sound-off-svgrepo-com.svg';
  } else if (soundIcon) {
    soundIcon.src = './img/assets/sound-svgrepo-com.svg';
  }
}

/**
 * Loads and initializes all game sound effects and music
 * Sets up background music and loads all required sound effects
 */
function loadSounds() {
  audioManager.loadSound('background', 'audio/background_sound.mp3');
  audioManager.setVolume('background', 0.3);
  audioManager.playBackgroundMusic('background');
  audioManager.loadSound('game_over', 'audio/lose_sound.mp3');
  audioManager.loadSound('win', 'audio/win_sound.mp3');
  audioManager.loadSound('snoring', 'audio/snoring_sound.mp3');
  audioManager.loadSound('movement', 'audio/movement_character.mp3');
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

/**
 * Sets up event listener for the sound toggle button once the DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
  const soundIcon = document.getElementById('sound_icon');
  if (soundIcon) {
    soundIcon.addEventListener('click', toggleSound);
  }
});

/**
 * Toggles game sound on and off
 * Updates the sound icon to reflect current sound state
 * @returns {void}
 */
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

/**
 * Handles entering or exiting fullscreen mode for the game
 * Toggles fullscreen state based on current display mode
 */
function handleFullscreen() {
  const canvas = document.getElementById('game_container');
  if (!document.fullscreenElement && window.innerWidth < 1300) {
    openFullscreen(canvas);
  } else {
    closeFullscreen();
  }
}

/**
 * Opens fullscreen mode with cross-browser support
 * @param {HTMLElement} element - The element to display in fullscreen
 */
function openFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

/**
 * Exits fullscreen mode with cross-browser support
 * Handles different browser implementations for exiting fullscreen
 */
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

/**
 * Shows the game over screen
 */
function showGameOverScreen() {
  audioManager.playSound('game_over');
  audioManager.setVolume('game_over', 0.3);
  document.body.insertAdjacentHTML('beforeend', getGameOverTemplate());
  document.getElementById('retry_button').addEventListener('click', () => {
    document.getElementById('game_over_screen').remove();
    init();
  });
  document.getElementById('menu_button').addEventListener('click', () => {
    document.getElementById('game_over_screen').remove();
    goBackToStartscreen();
  });
}

/**
 * Shows the win screen when player completes the game
 */
function showWinScreen() {
  audioManager.playSound('win');
  audioManager.setVolume('win', 0.3);
  document.body.insertAdjacentHTML('beforeend', getWinTemplate());
  document.getElementById('play_again_button').addEventListener('click', () => {
    document.getElementById('win_screen').remove();
    init();
  });
  document.getElementById('win_menu_button').addEventListener('click', () => {
    document.getElementById('win_screen').remove();
    goBackToStartscreen();
  });
}