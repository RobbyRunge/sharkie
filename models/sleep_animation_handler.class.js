class SleepAnimationHandler {
  /**
   * Creates a new sleep animation handler
   * @param {CharacterAnimation} animation - The character animation instance
   */
  constructor(animation) {
    this.animation = animation;
    this.character = animation.character;
    this.idleTime = 0;
    this.isInSleepMode = false;
    this.sleepCycleComplete = false;
    this.currentSleepFrame = 0;
    this.snoringTimeoutId = null;
  }

  /**
   * Updates the idle state and sleep mode
   */
  updateIdleState() {
    this.idleTime += 100;
    if (this.idleTime > 5000 && !this.isInSleepMode) {
      this.isInSleepMode = true;
      this.sleepCycleComplete = false;
      this.currentSleepFrame = 0;
      if (this.snoringTimeoutId) {
        clearTimeout(this.snoringTimeoutId);
      }
      this.snoringTimeoutId = setTimeout(() => {
        if (this.isInSleepMode) {
          audioManager.playSound('snoring', false);
          audioManager.setVolume('snoring', 0.05);
        }
      }, 3200);
    }  
  }

  /**
   * Exits sleep animation mode
   */
  exitSleepMode() {
    if (this.isInSleepMode) {
      this.isInSleepMode = false;
      this.sleepCycleComplete = false;
      this.currentSleepFrame = 0;
      if (this.snoringTimeoutId) {
        clearTimeout(this.snoringTimeoutId);
        this.snoringTimeoutId = null;
      }
      audioManager.stopSound('snoring');
    }
  }

  /**
   * Plays the sleeping animation
   * @param {number} now - Current timestamp
   */
  playSlowSleepAnimation(now) {
    if (now - this.animation.lastAnimationUpdate.sleeping >= this.animation.animationSpeed.sleeping) {
      this.animation.lastAnimationUpdate.sleeping = now;
      if (!this.sleepCycleComplete) {
        this.playInitialSleepAnimation();
      } else {
        this.playLoopingSleepAnimation();
      }
    }
  }
  
  /**
   * Plays the initial part of sleep animation sequence
   */
  playInitialSleepAnimation() {
    this.character.img = this.character.imageCache[this.animation.IMAGES_SLEEP[this.currentSleepFrame]];
    this.currentSleepFrame++;
    if (this.currentSleepFrame >= this.animation.IMAGES_SLEEP.length) {
      this.sleepCycleComplete = true;
      this.currentSleepFrame = 10;
    }
  }
  
  /**
   * Plays the looping part of sleep animation
   */
  playLoopingSleepAnimation() {
    this.character.img = this.character.imageCache[this.animation.IMAGES_SLEEP[this.currentSleepFrame]];
    this.currentSleepFrame++; 
    if (this.currentSleepFrame > 13) {
      this.currentSleepFrame = 10;
    }
  }

  /**
   * Gets the current idle time
   * @returns {number} Current idle time
   */
  getIdleTime() {
    return this.idleTime;
  }

  /**
   * Checks if character is in sleep mode
   * @returns {boolean} True if in sleep mode
   */
  getIsInSleepMode() {
    return this.isInSleepMode;
  }

  /**
   * Resets the idle time to zero
   */
  resetIdleTime() {
    this.idleTime = 0;
  }
}