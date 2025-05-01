class CharacterAnimation {
  idleTime = 0;
  isSlapping = false;
  currentSlapFrame = 0;
  slapComplete = false;
  currentDeadFrame = 0;
  deathAnimationComplete = false;
  isMovementSoundPlaying = false;
  animationSpeed = {
    swimming: 100,
    standing: 150,
    sleeping: 300,
    hit: 100,
    slapping: 70,
    shooting: 50
  };
  lastAnimationUpdate = {
    swimming: 0,
    standing: 0,
    sleeping: 0,
    hit: 0,
    slapping: 0,
    shooting: 0
  };
  character;

  IMAGES_STAND;
  IMAGES_SWIMMING;
  IMAGES_SLEEP;
  IMAGES_HIT;
  IMAGES_HIT_ELECTRIC;
  IMAGES_SHOOTING;
  IMAGES_SLAP;
  IMAGES_DEAD;

  /**
   * Creates a new character animation handler
   * @param {Character} character - The character to animate
   */
  constructor(character) {
    this.character = character;
    this.initImageArrays();
    this.loadAllImages();
    this.sleepHandler = new SleepAnimationHandler(this);
    this.shootingHandler = new ShootingAnimationHandler(this);
    this.hitHandler = new HitAnimationHandler(this);
  }

  /**
   * Initializes all image arrays from the AnimationAssets class
   */
  initImageArrays() {
    this.IMAGES_STAND = AnimationAssets.getStandingImages();
    this.IMAGES_SWIMMING = AnimationAssets.getSwimmingImages();
    this.IMAGES_SLEEP = AnimationAssets.getSleepImages();
    this.IMAGES_HIT = AnimationAssets.getHitImages();
    this.IMAGES_HIT_ELECTRIC = AnimationAssets.getElectricHitImages();
    this.IMAGES_SHOOTING = AnimationAssets.getShootingImages();
    this.IMAGES_SLAP = AnimationAssets.getSlapImages();
    this.IMAGES_DEAD = AnimationAssets.getDeadImages();
  }

  /**
   * Loads all character animation images
   */
  loadAllImages() {
    this.character.loadImage(this.IMAGES_STAND[0]);
    this.character.loadImages(this.IMAGES_STAND);
    this.character.loadImages(this.IMAGES_SWIMMING);
    this.character.loadImages(this.IMAGES_SLEEP);
    this.character.loadImages(this.IMAGES_HIT);
    this.character.loadImages(this.IMAGES_HIT_ELECTRIC);
    this.character.loadImages(this.IMAGES_SHOOTING);
    this.character.loadImages(this.IMAGES_SLAP);
    this.character.loadImages(this.IMAGES_DEAD);
  }

  /**
   * Sets up the animation system
   */
  animate() {
    this.setupAnimationLoop();
  }

  /**
   * Sets up the main animation loop
   */
  setupAnimationLoop() {
    setStoppableInterval(() => {
      if (!isGameActive) return;
      const now = new Date().getTime();
      const wasHit = this.hitHandler.getIsHitState(); 
      this.determineAndPlayAnimation(now, wasHit);
    }, 100);
  }

  /**
   * Determines the current animation state and plays the appropriate animation
   * @param {number} now - Current timestamp
   * @param {boolean} wasHit - Whether the character was in hit state
   */
  determineAndPlayAnimation(now, wasHit) {
    if (this.character.isDead()) {
      this.handleDeathState(wasHit);
    } else if (this.hitHandler.getIsHitState()) {
      this.hitHandler.handleHitAnimation(now);
    } else {
      this.handleNormalState(now, wasHit);
    }
  }

  /**
   * Handles the character's death state
   * @param {boolean} wasHit - Whether character was previously hit
   */
  handleDeathState(wasHit) {
    if (wasHit) {
      this.hitHandler.stopHitSounds();
    }
    this.handleDeadAnimation();
  }

  /**
   * Handles normal (non-hit, non-dead) animation states
   * @param {number} now - Current timestamp
   * @param {boolean} wasHit - Whether character was previously hit
   */
  handleNormalState(now, wasHit) {
    if (wasHit) {
      this.hitHandler.stopHitSounds();
    }
    if (this.isSlapping) {
      this.handleSlapingAnimation(now);
    } else if (this.shootingHandler.getIsShootingState()) {
      this.shootingHandler.handleShootingAnimation(now);
    } else if (this.character.isMoving()) {
      this.handleMovementAnimation(now);
    } else {
      this.handleIdleAnimation(now);
    }
  }

  /**
   * Handles character death animation
   */
  handleDeadAnimation() {
    if (this.currentDeadFrame < this.IMAGES_DEAD.length) {
      this.character.img = this.character.imageCache[this.IMAGES_DEAD[this.currentDeadFrame]];
      this.currentDeadFrame++;
    } else if (!this.deathAnimationComplete) {
      closeFullscreen();
      this.deathAnimationComplete = true;
      this.character.world.stopGame();
      showGameOverScreen();
    }
  }

  /**
   * Handles slap attack animation
   * @param {number} now - Current timestamp
   */
  handleSlapingAnimation(now) {
    if (this.shouldSkipSlapAnimationUpdate(now)) return;
    this.updateSlapAnimationTimestamp(now);
    this.advanceSlapFrame();
    this.checkForSlapAnimationCompletion();
  }

  /**
   * Determines if slap animation update should be skipped
   * @param {number} now - Current timestamp
   * @returns {boolean} True if update should be skipped
   */
  shouldSkipSlapAnimationUpdate(now) {
    const timeElapsed = now - this.lastAnimationUpdate.slapping;
    return timeElapsed < this.animationSpeed.slapping;
  }

  /**
   * Updates the timestamp for slap animation
   * @param {number} now - Current timestamp
   */
  updateSlapAnimationTimestamp(now) {
    this.lastAnimationUpdate.slapping = now;
  }

  /**
   * Advances to the next frame in slap animation
   */
  advanceSlapFrame() {
    if (this.currentSlapFrame < this.IMAGES_SLAP.length) {
      this.character.img = this.character.imageCache[this.IMAGES_SLAP[this.currentSlapFrame]];
      this.currentSlapFrame++;
    }
  }

  /**
   * Checks if slap animation has completed
   */
  checkForSlapAnimationCompletion() {
    if (this.currentSlapFrame >= this.IMAGES_SLAP.length) {
      this.character.resetSlapState();
    }
  }

  /**
   * Handles swimming animation when character is moving
   * @param {number} now - Current timestamp
   */
  handleMovementAnimation(now) {
    if (!this.isMovementSoundPlaying) {
      audioManager.playSound('movement', false);
      audioManager.setVolume('movement', 0.1);
      this.isMovementSoundPlaying = true;
    }
    if (this.sleepHandler.getIsInSleepMode()) {
      this.sleepHandler.exitSleepMode();
    }
    this.sleepHandler.resetIdleTime();
    if (now - this.lastAnimationUpdate.swimming >= this.animationSpeed.swimming) {
      this.playCharacterAnimation(this.IMAGES_SWIMMING);
      this.lastAnimationUpdate.swimming = now;
    }
  }

  /**
   * Handles idle animation when character is not moving
   * @param {number} now - Current timestamp
   */
  handleIdleAnimation(now) {
    if (this.isMovementSoundPlaying) {
      audioManager.stopSound('movement');
      this.isMovementSoundPlaying = false;
    }
    this.sleepHandler.updateIdleState();
    if (this.sleepHandler.getIsInSleepMode()) {
      this.sleepHandler.playSlowSleepAnimation(now);
    } else {
      this.playStandingAnimation(now);
    }
  }

  /**
   * Exits sleep animation mode
   */
  exitSleepMode() {
    this.sleepHandler.exitSleepMode();
  }

  /**
   * Plays the standing idle animation
   * @param {number} now - Current timestamp
   */
  playStandingAnimation(now) {
    if (now - this.lastAnimationUpdate.standing >= this.animationSpeed.standing) {
      this.playCharacterAnimation(this.IMAGES_STAND);
      this.lastAnimationUpdate.standing = now;
    }
  }

  /**
   * Plays a character animation from image array
   * @param {string[]} images - Array of image paths
   */
  playCharacterAnimation(images) {
    if (!isGameActive || !images || !images.length) return;
    let index = this.character.currentImage % images.length;
    let path = images[index];
    this.character.img = this.character.imageCache[path];
    this.character.currentImage++;
  }
}
