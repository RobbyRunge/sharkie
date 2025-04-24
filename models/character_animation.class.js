class CharacterAnimation {
  // Animation image arrays
  IMAGES_STAND = [
    './img/1.Sharkie/1.IDLE/1.png',
    './img/1.Sharkie/1.IDLE/2.png',
    './img/1.Sharkie/1.IDLE/3.png',
    './img/1.Sharkie/1.IDLE/4.png',
    './img/1.Sharkie/1.IDLE/5.png',
    './img/1.Sharkie/1.IDLE/6.png',
    './img/1.Sharkie/1.IDLE/7.png',
    './img/1.Sharkie/1.IDLE/8.png',
    './img/1.Sharkie/1.IDLE/9.png',
    './img/1.Sharkie/1.IDLE/10.png',
    './img/1.Sharkie/1.IDLE/11.png',
    './img/1.Sharkie/1.IDLE/12.png',
    './img/1.Sharkie/1.IDLE/13.png',
    './img/1.Sharkie/1.IDLE/14.png',
    './img/1.Sharkie/1.IDLE/15.png',
    './img/1.Sharkie/1.IDLE/16.png',
    './img/1.Sharkie/1.IDLE/17.png',
    './img/1.Sharkie/1.IDLE/18.png'
  ];

  IMAGES_SWIMMING = [
    './img/1.Sharkie/3.Swim/1.png',
    './img/1.Sharkie/3.Swim/2.png',
    './img/1.Sharkie/3.Swim/3.png',
    './img/1.Sharkie/3.Swim/4.png',
    './img/1.Sharkie/3.Swim/5.png',
    './img/1.Sharkie/3.Swim/6.png'
  ];

  IMAGES_SLEEP = [
    './img/1.Sharkie/2.Long_IDLE/i1.png',
    './img/1.Sharkie/2.Long_IDLE/I2.png',
    './img/1.Sharkie/2.Long_IDLE/I3.png',
    './img/1.Sharkie/2.Long_IDLE/I4.png',
    './img/1.Sharkie/2.Long_IDLE/I5.png',
    './img/1.Sharkie/2.Long_IDLE/I6.png',
    './img/1.Sharkie/2.Long_IDLE/I7.png',
    './img/1.Sharkie/2.Long_IDLE/I8.png',
    './img/1.Sharkie/2.Long_IDLE/I9.png',
    './img/1.Sharkie/2.Long_IDLE/I10.png',
    './img/1.Sharkie/2.Long_IDLE/I11.png',
    './img/1.Sharkie/2.Long_IDLE/I12.png',
    './img/1.Sharkie/2.Long_IDLE/I13.png',
    './img/1.Sharkie/2.Long_IDLE/I14.png'
  ];

  IMAGES_HIT = [
    './img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
    './img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
    './img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
    './img/1.Sharkie/5.Hurt/1.Poisoned/4.png',
  ];

  IMAGES_HIT_ELECTRIC = [
    './img/1.Sharkie/5.Hurt/2.Electric shock/1.png',
    './img/1.Sharkie/5.Hurt/2.Electric shock/2.png',
    './img/1.Sharkie/5.Hurt/2.Electric shock/3.png',
  ];

  IMAGES_SHOOTING = [
    'img/1.Sharkie/4.Attack/Bubble trap/For Whale/1.png',
    'img/1.Sharkie/4.Attack/Bubble trap/For Whale/2.png',
    'img/1.Sharkie/4.Attack/Bubble trap/For Whale/3.png',
    'img/1.Sharkie/4.Attack/Bubble trap/For Whale/4.png',
    'img/1.Sharkie/4.Attack/Bubble trap/For Whale/5.png',
    'img/1.Sharkie/4.Attack/Bubble trap/For Whale/6.png',
    'img/1.Sharkie/4.Attack/Bubble trap/For Whale/7.png',
    'img/1.Sharkie/4.Attack/Bubble trap/For Whale/8.png',
  ];

  IMAGES_SLAP = [
    'img/1.Sharkie/4.Attack/Fin slap/1.png',
    'img/1.Sharkie/4.Attack/Fin slap/2.png',
    'img/1.Sharkie/4.Attack/Fin slap/3.png',
    'img/1.Sharkie/4.Attack/Fin slap/4.png',
    'img/1.Sharkie/4.Attack/Fin slap/5.png',
    'img/1.Sharkie/4.Attack/Fin slap/6.png',
    'img/1.Sharkie/4.Attack/Fin slap/7.png',
    'img/1.Sharkie/4.Attack/Fin slap/8.png',
    'img/1.Sharkie/4.Attack/Fin slap/4.png',
    'img/1.Sharkie/4.Attack/Fin slap/3.png',
    'img/1.Sharkie/4.Attack/Fin slap/2.png',
    'img/1.Sharkie/4.Attack/Fin slap/1.png',
  ];

  IMAGES_DEAD = [
    './img/1.Sharkie/6.dead/1.Poisoned/1.png',
    './img/1.Sharkie/6.dead/1.Poisoned/2.png',
    './img/1.Sharkie/6.dead/1.Poisoned/3.png',
    './img/1.Sharkie/6.dead/1.Poisoned/4.png',
    './img/1.Sharkie/6.dead/1.Poisoned/5.png',
    './img/1.Sharkie/6.dead/1.Poisoned/6.png',
    './img/1.Sharkie/6.dead/1.Poisoned/7.png',
    './img/1.Sharkie/6.dead/1.Poisoned/8.png',
    './img/1.Sharkie/6.dead/1.Poisoned/9.png',
    './img/1.Sharkie/6.dead/1.Poisoned/10.png',
    './img/1.Sharkie/6.dead/1.Poisoned/11.png',
    './img/1.Sharkie/6.dead/1.Poisoned/12.png',
  ];

  // Animation state tracking
  idleTime = 0;
  isInSleepMode = false;
  sleepCycleComplete = false;
  currentSleepFrame = 0;
  isHit = false;
  hitTime = 0;
  hitDuration = 100;
  hitType = 'poison'; // Default hit type
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

  character; // Reference to the character that owns this animation

  constructor(character) {
    this.character = character;
    this.loadAllImages();
  }

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

  animate() {
    this.setupAnimationLoop();
  }

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

  handleDeadAnimation() {
    if (this.currentDeadFrame < this.IMAGES_DEAD.length) {
      this.character.img = this.character.imageCache[this.IMAGES_DEAD[this.currentDeadFrame]];
      this.currentDeadFrame++;
    } else if (!this.deathAnimationComplete) {
      this.deathAnimationComplete = true;
      this.character.world.stopGame();
      this.character.world.showGameOverScreen();
    }
  }

  handleHitAnimation(now) {
    if (now - this.lastAnimationUpdate.hit >= this.animationSpeed.hit) {
      // Choose animation based on hit type
      if (this.hitType === 'electric') {
        this.playCharacterAnimation(this.IMAGES_HIT_ELECTRIC);
      } else {
        this.playCharacterAnimation(this.IMAGES_HIT);
      }
      this.lastAnimationUpdate.hit = now;
      this.hitTime += 100;
      if (this.hitTime >= this.hitDuration) {
        this.isHit = false;
        this.hitTime = 0;
      }
    }
  }

  startSlapping() {
    if (!this.isSlapping) {
      if (this.isInSleepMode) {
        audioManager.stopSound('snoring');
      }
      audioManager.playSound('slap');
      audioManager.setVolume('slap', 0.3);
      this.idleTime = 0;
      this.isInSleepMode = false;
      this.sleepCycleComplete = false;
      this.currentSleepFrame = 0;
      this.isSlapping = true;
      this.currentSlapFrame = 0;
      this.slapComplete = false;
      return true;
    }
    return false;
  }

  handleSlapingAnimation(now) {
    if (this.shouldSkipSlapAnimationUpdate(now)) return;
    this.updateSlapAnimationTimestamp(now);
    this.advanceSlapFrame();
    this.checkForSlapAnimationCompletion();
  }

  shouldSkipSlapAnimationUpdate(now) {
    const timeElapsed = now - this.lastAnimationUpdate.slapping;
    return timeElapsed < this.animationSpeed.slapping;
  }

  updateSlapAnimationTimestamp(now) {
    this.lastAnimationUpdate.slapping = now;
  }

  advanceSlapFrame() {
    if (this.currentSlapFrame < this.IMAGES_SLAP.length) {
      this.character.img = this.character.imageCache[this.IMAGES_SLAP[this.currentSlapFrame]];
      this.currentSlapFrame++;
    }
  }

  checkForSlapAnimationCompletion() {
    if (this.currentSlapFrame >= this.IMAGES_SLAP.length) {
      this.resetSlapState();
    }
  }

  resetSlapState() {
    this.isSlapping = false;
    this.currentSlapFrame = 0;
  }

  startShooting() {
    // Only start shooting if we have bottles and aren't already shooting
    if (this.character.bottles > 0 && !this.isShooting && this.canShoot) {
      if (this.isInSleepMode) {
        audioManager.stopSound('snoring');
      }
      this.isShooting = true;
      this.canShoot = false;
      this.shootingComplete = false;
      this.shootingProcessed = false;
      this.shootingTime = 0;
      this.currentShootingFrame = 0; // Reset frame index when starting new shot
      return true;
    }
    return false;
  }

  handleShootingAnimation(now) {
    if (this.shouldSkipAnimationUpdate(now)) return;
    this.updateAnimationTimestamp(now);
    this.advanceShootingFrame();
    this.trackAnimationProgress();
    this.checkForAnimationCompletion();
    this.checkForAnimationReset();
  }
  
  shouldSkipAnimationUpdate(now) {
    const timeElapsed = now - this.lastAnimationUpdate.shooting;
    return timeElapsed < this.animationSpeed.shooting;
  }
  
  updateAnimationTimestamp(now) {
    this.lastAnimationUpdate.shooting = now;
  }
  
  advanceShootingFrame() {
    if (this.currentShootingFrame < this.IMAGES_SHOOTING.length) {
      this.character.img = this.character.imageCache[this.IMAGES_SHOOTING[this.currentShootingFrame]];
      this.currentShootingFrame++; // Move to next frame
    }
  }
  
  trackAnimationProgress() {
    this.shootingTime += 100;
  }
  
  checkForAnimationCompletion() {
    if (this.currentShootingFrame >= this.IMAGES_SHOOTING.length - 1 && !this.shootingComplete) {
      this.shootingComplete = true;
    }
  }
  
  checkForAnimationReset() {
    if (this.currentShootingFrame >= this.IMAGES_SHOOTING.length) {
      this.resetShootingState();
    }
  }
  
  // Helper method to reset all shooting-related state
  resetShootingState() {
    // Reset idle time when moving
    this.idleTime = 0;
    this.isInSleepMode = false;
    this.sleepCycleComplete = false;
    this.currentSleepFrame = 0;
    this.isShooting = false;
    this.shootingTime = 0;
    this.shootingComplete = false;
    this.shootingProcessed = false;
    this.currentShootingFrame = 0; // Reset frame index
    setTimeout(() => {
      this.canShoot = true;
    }, 200);
  }

  handleMovementAnimation(now) {
    if (this.isInSleepMode) {
      audioManager.stopSound('snoring');
    }
    // audioManager.playSound('movement');
    // audioManager.setVolume('movement', 0.1);
    // Reset idle time when moving
    this.idleTime = 0;
    this.isInSleepMode = false;
    this.sleepCycleComplete = false;
    this.currentSleepFrame = 0;
    // Update swimming animation at swimming speed
    if (now - this.lastAnimationUpdate.swimming >= this.animationSpeed.swimming) {
      this.playCharacterAnimation(this.IMAGES_SWIMMING);
      this.lastAnimationUpdate.swimming = now;
    }
  }

  handleIdleAnimation(now) {
    // Character is idle
    this.updateIdleState();
    if (this.isInSleepMode) {
      this.playSlowSleepAnimation(now);
    } else {
      this.playStandingAnimation(now);
    }
  }

  updateIdleState() {
    this.idleTime += 100; // Add 100ms to idle time
    if (this.idleTime > 5000 && !this.isInSleepMode) {
      // After 5 seconds of idle time, start sleep animation
      this.isInSleepMode = true;
      this.sleepCycleComplete = false;
      this.currentSleepFrame = 0;
      setTimeout(() => {
        audioManager.playSound('snoring');
        audioManager.setVolume('snoring', 0.05);
      }, 3200); 
    }  
  }

  playSlowSleepAnimation(now) {
    // Only update animation when enough time has passed
    if (now - this.lastAnimationUpdate.sleeping >= this.animationSpeed.sleeping) {
      this.lastAnimationUpdate.sleeping = now;
      if (!this.sleepCycleComplete) {
        this.playInitialSleepAnimation();
      } else {
        this.playLoopingSleepAnimation();
      }
    }
  }
  
  playInitialSleepAnimation() {
    // First cycle: Play full animation
    this.character.img = this.character.imageCache[this.IMAGES_SLEEP[this.currentSleepFrame]];
    this.currentSleepFrame++;
    // Check if first cycle is complete
    if (this.currentSleepFrame >= this.IMAGES_SLEEP.length) {
      this.sleepCycleComplete = true;
      this.currentSleepFrame = 10; // Index for frame 11
    }
  }
  
  playLoopingSleepAnimation() {
    // After first cycle: Only play frames 11-14
    this.character.img = this.character.imageCache[this.IMAGES_SLEEP[this.currentSleepFrame]];
    this.currentSleepFrame++; 
    // Loop between frames 10-14 (indices 10-13)
    if (this.currentSleepFrame > 13) {
      this.currentSleepFrame = 10;
    }
  }

  playStandingAnimation(now) {
    // Update standing animation at standing speed
    if (now - this.lastAnimationUpdate.standing >= this.animationSpeed.standing) {
      this.playCharacterAnimation(this.IMAGES_STAND);
      this.lastAnimationUpdate.standing = now;
    }
  }

  // Custom animation player that doesn't rely on MoveableObject.playAnimation
  playCharacterAnimation(images) {
    if (!isGameActive || !images || !images.length) return;
    let index = this.character.currentImage % images.length;
    let path = images[index];
    this.character.img = this.character.imageCache[path];
    this.character.currentImage++;
  }

  // Trigger hit animation and state
  triggerHit(hitType = 'poison') {
    if (!this.character.isDead() && !this.isHit) {
      this.isHit = true;
      this.hitTime = 0;
      this.hitType = hitType; // Set the hit type
      return true;
    }
    return false;
  }
}
