class CharacterAnimation {
  idleTime = 0;
  isInSleepMode = false;
  sleepCycleComplete = false;
  currentSleepFrame = 0;
  isHit = false;
  hitTime = 0;
  hitDuration = 300;
  hitType = 'poison'; 
  isSlapping = false;
  currentSlapFrame = 0;
  slapComplete = false;
  isShooting = false;
  currentShootingFrame = 0;
  shootingTime = 0;
  shootingDuration = 350;
  shootingComplete = false;
  canShoot = true;
  shootingProcessed = false;
  currentDeadFrame = 0;
  deathAnimationComplete = false;
  snoringTimeoutId = null;
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

  // Image arrays now come from AnimationAssets
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
      if (this.character.isDead()) {
        this.handleDeadAnimation();
      } else if (this.isHit) {
        this.handleHitAnimation(now);
      } else if (this.isSlapping) {
        this.handleSlapingAnimation(now);
      } else if (this.isShooting) {
        this.handleShootingAnimation(now);
      } else if (this.character.isMoving()) {
        this.handleMovementAnimation(now);
      } else {
        this.handleIdleAnimation(now);
      }
    }, 100);
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
   * Handles hit animation
   * @param {number} now - Current timestamp
   */
  handleHitAnimation(now) {
    if (now - this.lastAnimationUpdate.hit >= this.animationSpeed.hit) {
      if (this.hitType === 'electric' && this.isHit) {
        audioManager.playSound('electric_shock', false);
        audioManager.setVolume('electric_shock', 0.3);
        this.playCharacterAnimation(this.IMAGES_HIT_ELECTRIC);
      } else {
        this.playCharacterAnimation(this.IMAGES_HIT);
        audioManager.playSound('normal_damage', false);
        audioManager.setVolume('normal_damage', 0.3);
      }
      this.lastAnimationUpdate.hit = now;
      this.hitTime += 100;
      if (this.hitTime >= this.hitDuration) {
        if (this.hitType === 'electric') {
          audioManager.stopSound('electric_shock');
        }
        this.isHit = false;
        this.hitTime = 0;
      }
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
    const timeElapsed = now - this.lastAnimationUpdate.shooting;
    return timeElapsed < this.animationSpeed.shooting;
  }
  
  /**
   * Updates the timestamp for the current animation
   * @param {number} now - Current timestamp
   */
  updateAnimationTimestamp(now) {
    this.lastAnimationUpdate.shooting = now;
  }
  
  /**
   * Advances to the next frame in shooting animation
   */
  advanceShootingFrame() {
    if (this.currentShootingFrame < this.IMAGES_SHOOTING.length) {
      this.character.img = this.character.imageCache[this.IMAGES_SHOOTING[this.currentShootingFrame]];
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
    if (this.currentShootingFrame >= this.IMAGES_SHOOTING.length - 1 && !this.shootingComplete) {
      this.shootingComplete = true;
    }
  }
  
  /**
   * Checks if animation should be reset
   */
  checkForAnimationReset() {
    if (this.currentShootingFrame >= this.IMAGES_SHOOTING.length) {
      this.character.resetShootingState();
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
    
    if (this.isInSleepMode) {
      this.exitSleepMode();
    }
    this.idleTime = 0;
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
    
    this.updateIdleState();
    if (this.isInSleepMode) {
      this.playSlowSleepAnimation(now);
    } else {
      this.playStandingAnimation(now);
    }
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
    if (now - this.lastAnimationUpdate.sleeping >= this.animationSpeed.sleeping) {
      this.lastAnimationUpdate.sleeping = now;
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
    this.character.img = this.character.imageCache[this.IMAGES_SLEEP[this.currentSleepFrame]];
    this.currentSleepFrame++;
    if (this.currentSleepFrame >= this.IMAGES_SLEEP.length) {
      this.sleepCycleComplete = true;
      this.currentSleepFrame = 10;
    }
  }
  
  /**
   * Plays the looping part of sleep animation
   */
  playLoopingSleepAnimation() {
    this.character.img = this.character.imageCache[this.IMAGES_SLEEP[this.currentSleepFrame]];
    this.currentSleepFrame++; 
    if (this.currentSleepFrame > 13) {
      this.currentSleepFrame = 10;
    }
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
