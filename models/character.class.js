class Character extends MoveableObject {
  width = 200;
  x = 0;
  height = 200;
  y = 100;
  world;
  speed = 1; 
  rotation = 0; 
  bottles = 0;
  maxBottles = 5;
  coins = 0;
  maxCoins = 5;
  animation; 
  speedBoostActive = false; 

  constructor() {
    super();
    this.offsetTop = 95;
    this.offsetBottom = 45;
    this.offsetX = 40;
    this.offsetY = 40; 
    this.animation = new CharacterAnimation(this);
    this.animate();
  }

  animate() {
    this.setupControlLoop();
    this.animation.animate();
  }

  setupControlLoop() {
    setStoppableInterval(() => {
      if (isGameActive) {
        this.controlCharacter();
        this.updateCamera();
      }
    }, 1000 / 160);
  }

  updateCamera() {
    this.world.camera_x = Math.round(-this.x + 100);
  }

  isMoving() {
    return this.world.keyboard.RIGHT || 
           this.world.keyboard.LEFT || 
           this.world.keyboard.UP || 
           this.world.keyboard.DOWN;
  }

  controlCharacter() {
    this.handleHorizontalMovement();
    this.handleVerticalMovement();
    this.updateRotation();
  }

  handleHorizontalMovement() {
    if (this.isDead()) return; 
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
    }
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft();
    }
  }

  moveRight() {
    this.x += this.speed;
    if (!this.isDead()) { 
      this.otherDirection = false;
    }
  }

  moveLeft() {
    this.x -= this.speed;
    if (!this.isDead()) { 
      this.otherDirection = true;
    }
  }

  handleVerticalMovement() {
    if (this.isDead()) return; 
    if (this.world.keyboard.UP && this.y > -90) {
      this.moveUp();
    }
    if (this.world.keyboard.DOWN && this.y < 320) {
      this.moveDown();
    }
  }

  moveUp() {
    this.y -= this.speed;
    this.rotation = -10;
  }

  moveDown() {
    this.y += this.speed;
    this.rotation = 20;
  }

  updateRotation() {
    if (!this.world.keyboard.UP && !this.world.keyboard.DOWN) {
      this.rotation = 0;
    }
  }

  triggerHit(hitType = 'poison') {
    if (!this.isDead() && !this.animation.isHit) {
      this.animation.isHit = true;
      this.animation.hitTime = 0;
      this.animation.hitType = hitType; 
      return true;
    }
    return false;
  }

  hit(hitType = 'poison', damage = 5) {
    if (this.triggerHit(hitType)) {
      super.hit(damage);
    }
  }

  startSlapping() {
    if (!this.animation.isSlapping) {
      if (this.animation.isInSleepMode) {
        this.animation.exitSleepMode();
      }
      audioManager.playSound('slap');
      audioManager.setVolume('slap', 0.3);
      this.animation.idleTime = 0;
      this.animation.isInSleepMode = false;
      this.animation.sleepCycleComplete = false;
      this.animation.currentSleepFrame = 0;
      this.animation.isSlapping = true;
      this.animation.currentSlapFrame = 0;
      this.animation.slapComplete = false;
      return true;
    }
    return false;
  }

  resetSlapState() {
    this.animation.isSlapping = false;
    this.animation.currentSlapFrame = 0;
  }

  startShooting() {
    if (this.bottles > 0 && !this.animation.isShooting && this.animation.canShoot) {
      if (this.animation.isInSleepMode) {
        audioManager.stopSound('snoring');
      }
      setTimeout(() => {
        audioManager.playSound('bubble_shoot', false);
        audioManager.setVolume('bubble_shoot', 0.3);
      }, 760);
      this.animation.isShooting = true;
      this.animation.canShoot = false;
      this.animation.shootingComplete = false;
      this.animation.shootingProcessed = false;
      this.animation.shootingTime = 0;
      this.animation.currentShootingFrame = 0;
      return true;
    }
    return false;
  }

  resetShootingState() {
    this.animation.idleTime = 0;
    this.animation.isInSleepMode = false;
    this.animation.sleepCycleComplete = false;
    this.animation.currentSleepFrame = 0;
    this.animation.isShooting = false;
    this.animation.shootingTime = 0;
    this.animation.shootingComplete = false;
    this.animation.shootingProcessed = false;
    this.animation.currentShootingFrame = 0;
    setTimeout(() => {
      this.animation.canShoot = true;
    }, 200);
  }

  collectBottle() {
    if (this.bottles < this.maxBottles) {
      audioManager.playSound('collect_bottle', false);
      audioManager.setVolume('collect_bottle', 0.2);
      this.bottles++;
      return true; 
    }
    return false; 
  }

  collectCoins() {
    if (this.coins < this.maxCoins) {
      audioManager.playSound('collect_coin', false);
      audioManager.setVolume('collect_coin', 0.1);
      this.coins++;
      return true;
    }
    return false;
  }

  multiplySpeedByCollectCoins() {
    if (this.canActivateSpeedBoost()) {
      audioManager.playSound('use_coin', false);
      audioManager.setVolume('use_coin', 0.3);
      this.activateSpeedBoost();
      this.scheduleSpeedBoostReset();
      return true;
    }
    return false;
  }
  
  canActivateSpeedBoost() {
    return !this.speedBoostActive && this.coins > 0;
  }
  
  activateSpeedBoost() {
    this.speedBoostActive = true;
    this.originalSpeed = this.speed;
    this.originalAnimationSpeeds = {...this.animation.animationSpeed};
    this.speed *= 1.5;
    this.higherAnimationSpeed();
    this.coins--;
    if (this.world) {
      this.world.updateCoinBar();
    }
  }
  
  scheduleSpeedBoostReset() {
    setTimeout(() => {
      this.resetSpeedBoost();
    }, 5000);
  }
  
  resetSpeedBoost() {
    this.speed = this.originalSpeed;
    this.animation.animationSpeed = this.originalAnimationSpeeds;
    this.speedBoostActive = false;
  }
  
  higherAnimationSpeed() {
    this.animation.animationSpeed.swimming = 50;  
    this.animation.animationSpeed.slapping = 15; 
  }
  
  useBottle() {
    if (this.bottles > 0) {
      this.bottles--;
      return true; 
    }
    return false; 
  }

  playAnimation(images) {
    this.animation.playCharacterAnimation(images);
  }
}