class HitAnimationHandler {
  /**
   * Creates a new hit animation handler
   * @param {CharacterAnimation} animation - The character animation instance
   */
  constructor(animation) {
    this.animation = animation;
    this.character = animation.character;
    this.isHit = false;
    this.hitTime = 0;
    this.hitDuration = 300;
    this.hitType = 'poison';  // 'poison' or 'electric'
  }

  /**
   * Handles hit animation
   * @param {number} now - Current timestamp
   */
  handleHitAnimation(now) {
    if (!this.shouldUpdateHitAnimation(now)) return;
    
    this.playHitSoundIfNeeded();
    this.playHitAnimation();
    this.updateHitState();
    this.checkHitDuration();
  }

  /**
   * Determines if hit animation should be updated
   * @param {number} now - Current timestamp
   * @returns {boolean} True if animation should be updated
   */
  shouldUpdateHitAnimation(now) {
    return now - this.animation.lastAnimationUpdate.hit >= this.animation.animationSpeed.hit;
  }

  /**
   * Plays appropriate hit sound if this is the first frame
   */
  playHitSoundIfNeeded() {
    if (this.hitTime !== 0) return;
    
    const soundType = this.hitType === 'electric' ? 'electric_shock' : 'normal_damage';
    audioManager.playSound(soundType, false)
      .then(() => {
        audioManager.setVolume(soundType, 0.3);
      });
  }

  /**
   * Plays the appropriate hit animation based on hit type
   */
  playHitAnimation() {
    const hitImages = this.hitType === 'electric' ? 
      this.animation.IMAGES_HIT_ELECTRIC : this.animation.IMAGES_HIT;
    this.animation.playCharacterAnimation(hitImages);
  }

  /**
   * Updates the hit state timing information
   */
  updateHitState() {
    this.animation.lastAnimationUpdate.hit = new Date().getTime();
    this.hitTime += 100;
  }

  /**
   * Checks if hit duration has expired
   */
  checkHitDuration() {
    if (this.hitTime >= this.hitDuration) {
      this.stopHitSounds();
      this.isHit = false;
    }
  }

  /**
   * Stops any active hit sounds
   */
  stopHitSounds() {
    audioManager.stopSound('electric_shock');
    audioManager.stopSound('normal_damage');
    this.hitTime = 0;
  }

  /**
   * Sets the hit state
   * @param {boolean} isHit - Whether character is hit
   * @param {string} hitType - Type of hit ('poison' or 'electric')
   */
  setHitState(isHit, hitType = 'poison') {
    this.isHit = isHit;
    this.hitType = hitType;
  }

  /**
   * Gets the current hit state
   * @returns {boolean} True if character is in hit state
   */
  getIsHitState() {
    return this.isHit;
  }
}