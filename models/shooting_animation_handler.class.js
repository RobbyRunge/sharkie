class ShootingAnimationHandler {
  /**
   * Creates a new shooting animation handler
   * @param {CharacterAnimation} animation - The character animation instance
   */
  constructor(animation) {
    this.animation = animation;
    this.character = animation.character;
    this.isShooting = false;
    this.currentShootingFrame = 0;
    this.shootingTime = 0;
    this.shootingDuration = 350;
    this.shootingComplete = false;
    this.canShoot = true;
    this.shootingProcessed = false;
  }

  /**
   * Handles shooting animation
   * @param {number} now - Current timestamp
   */
  handleShootingAnimation(now) {
    if (this.shouldSkipAnimationUpdate(now)) return;
    this.updateAnimationTimestamp(now);
    this.advanceShootingFrame();
    this.trackAnimationProgress();
    this.checkForAnimationCompletion();
    this.checkForAnimationReset();
  }
  
  /**
   * Determines if animation update should be skipped
   * @param {number} now - Current timestamp
   * @returns {boolean} True if update should be skipped
   */
  shouldSkipAnimationUpdate(now) {
    const timeElapsed = now - this.animation.lastAnimationUpdate.shooting;
    return timeElapsed < this.animation.animationSpeed.shooting;
  }
  
  /**
   * Updates the timestamp for the current animation
   * @param {number} now - Current timestamp
   */
  updateAnimationTimestamp(now) {
    this.animation.lastAnimationUpdate.shooting = now;
  }
  
  /**
   * Advances to the next frame in shooting animation
   */
  advanceShootingFrame() {
    if (this.currentShootingFrame < this.animation.IMAGES_SHOOTING.length) {
      this.character.img = this.character.imageCache[this.animation.IMAGES_SHOOTING[this.currentShootingFrame]];
      this.currentShootingFrame++;
    }
  }
  
  /**
   * Tracks animation progress
   */
  trackAnimationProgress() {
    this.shootingTime += 100;
  }
  
  /**
   * Checks if animation has completed
   */
  checkForAnimationCompletion() {
    if (this.currentShootingFrame >= this.animation.IMAGES_SHOOTING.length - 1 && !this.shootingComplete) {
      this.shootingComplete = true;
    }
  }
  
  /**
   * Checks if animation should be reset
   */
  checkForAnimationReset() {
    if (this.currentShootingFrame >= this.animation.IMAGES_SHOOTING.length) {
      this.character.resetShootingState();
    }
  }

  /**
   * Set shooting state
   * @param {boolean} isShooting - Whether character is shooting
   */
  setShootingState(isShooting) {
    this.isShooting = isShooting;
  }

  /**
   * Reset shooting state values
   */
  resetShootingState() {
    this.isShooting = false;
    this.currentShootingFrame = 0;
    this.shootingTime = 0;
    this.shootingComplete = false;
    this.shootingProcessed = false;
  }

  /**
   * Gets the current shooting state
   * @returns {boolean} True if character is shooting
   */
  getIsShootingState() {
    return this.isShooting;
  }
}