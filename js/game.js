let canvas; 
let world; 
let keyboard;
let intervalIds = []; 
let isGameActive = true; 
let audioManager; 

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

function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
  return id;
}

function init() {
  intervalIds = []; 
  isGameActive = true;
  audioManager = new AudioManager();
  keyboard = new GameKeyboard();
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