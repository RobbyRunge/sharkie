/**
 * Starts the game by hiding the start screen
 */
function startGame() {
  let startScreenRef = document.getElementById('start_screen');
  startScreenRef.classList.add('d_none');
}

/**
 * Returns to the start screen and resets the game state
 */
function goBackToStartscreen() {  
  let startScreenRef = document.getElementById('start_screen');
  startScreenRef.classList.remove('d_none');
  isGameActive = false;
  intervalIds.forEach(clearInterval);
  intervalIds = [];
  resetWorldState();
  closeOverlay();
  closeFullscreen();
  audioManager.stopAllSounds();
}

/**
 * Resets the world state if the world object exists
 */
function resetWorldState() {
  if (world) {
    world.throwableObject = [];
    world.stopGame();
  }
}

/**
 * Opens an overlay of the specified type
 * @param {string} type - The type of overlay to open
 */
function openOverlay(type) {
  showBackgroundOverlay();
  showCloseButton();
  showSpecificOverlay(type);
  document.getElementById('background_overlay').addEventListener('click', handleBackgroundClick);
}

/**
 * Handles click events on the background overlay
 * @param {Event} event - The click event
 */
function handleBackgroundClick(event) {
  if (event.target.id === 'background_overlay') {
    closeOverlay();
  }
}

/**
 * Shows the background overlay
 */
function showBackgroundOverlay() {
  let backgroundOverlayRef = document.getElementById('background_overlay');
  backgroundOverlayRef.classList.add('background_overlay');
}

/**
 * Shows the close button for the overlay
 */
function showCloseButton() {
  let closeButton = document.getElementById('close_overlay_btn');
  closeButton.style.display = 'block';
}

/**
 * Shows a specific type of overlay content
 * @param {string} type - The type of overlay to show
 */
function showSpecificOverlay(type) {
  let overlayToShow = document.querySelector(`.${type}_overlay`);
  if (overlayToShow) {
    overlayToShow.style.display = 'block';
  }
}

/**
 * Closes all overlays and removes event listeners
 */
function closeOverlay() {
  let backgroundOverlayRef = document.getElementById('background_overlay');
  hideBackgroundOverlay(backgroundOverlayRef);
  hideCloseButton(backgroundOverlayRef);
  hideAllContentOverlays(backgroundOverlayRef);
  removeClassesAfterAnimation(backgroundOverlayRef);
  backgroundOverlayRef.removeEventListener('click', handleBackgroundClick);
}

/**
 * Adds a closing animation class to the background overlay
 * @param {HTMLElement} backgroundOverlayRef - The background overlay element
 */
function hideBackgroundOverlay(backgroundOverlayRef) {
  backgroundOverlayRef.classList.add('background_overlay_closing');
}

/**
 * Hides the close button
 */
function hideCloseButton() {
  let closeButton = document.getElementById('close_overlay_btn');
  closeButton.style.display = 'none';
}

/**
 * Hides all content overlays
 */
function hideAllContentOverlays() {
  let contentOverlays = document.querySelectorAll('.overlay_content');
  contentOverlays.forEach(overlay => {
    overlay.style.display = 'none';
  });
}

/**
 * Removes animation classes after transition completes
 * @param {HTMLElement} backgroundOverlayRef - The background overlay element
 */
function removeClassesAfterAnimation(backgroundOverlayRef) {
  setTimeout(function() {
    backgroundOverlayRef.classList.remove('background_overlay');
    backgroundOverlayRef.classList.remove('background_overlay_closing');
  }, 500);
}