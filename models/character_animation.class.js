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
      closeFullscreen();
      this.deathAnimationComplete = true;
      this.character.world.stopGame();
      this.character.world.showGameOverScreen();
    }
  }

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
      this.character.resetSlapState();
    }
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
      this.currentShootingFrame++;
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
      this.character.resetShootingState();
    }
  }

  handleMovementAnimation(now) {
    if (this.isInSleepMode) {
      this.exitSleepMode();
    }
    this.idleTime = 0;
    if (now - this.lastAnimationUpdate.swimming >= this.animationSpeed.swimming) {
      this.playCharacterAnimation(this.IMAGES_SWIMMING);
      this.lastAnimationUpdate.swimming = now;
    }
  }

  handleIdleAnimation(now) {
    this.updateIdleState();
    if (this.isInSleepMode) {
      this.playSlowSleepAnimation(now);
    } else {
      this.playStandingAnimation(now);
    }
  }

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
  
  playInitialSleepAnimation() {
    this.character.img = this.character.imageCache[this.IMAGES_SLEEP[this.currentSleepFrame]];
    this.currentSleepFrame++;
    if (this.currentSleepFrame >= this.IMAGES_SLEEP.length) {
      this.sleepCycleComplete = true;
      this.currentSleepFrame = 10;
    }
  }
  
  playLoopingSleepAnimation() {
    this.character.img = this.character.imageCache[this.IMAGES_SLEEP[this.currentSleepFrame]];
    this.currentSleepFrame++; 
    if (this.currentSleepFrame > 13) {
      this.currentSleepFrame = 10;
    }
  }

  playStandingAnimation(now) {
    if (now - this.lastAnimationUpdate.standing >= this.animationSpeed.standing) {
      this.playCharacterAnimation(this.IMAGES_STAND);
      this.lastAnimationUpdate.standing = now;
    }
  }

  playCharacterAnimation(images) {
    if (!isGameActive || !images || !images.length) return;
    let index = this.character.currentImage % images.length;
    let path = images[index];
    this.character.img = this.character.imageCache[path];
    this.character.currentImage++;
  }
}
