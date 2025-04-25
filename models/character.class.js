class Character extends MoveableObject {
  // Player character with controls and animations
  width = 200;
  x = 0;
  height = 200;
  y = 100;
  world;
  speed = 1; // reset to 1 when your are finished with the game
  rotation = 0; // Track current rotation angle in degrees
  bottles = 0; // Track collected poison bottles
  maxBottles = 5; // Maximum number of bottles to collect
  coins = 0;
  maxCoins = 5;
  animation; // Instance of CharacterAnimation
  speedBoostActive = false; // Track if speed boost is active

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
    if (this.isDead()) return; // Don't allow movement when dead
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
    }
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft();
    }
  }

  moveRight() {
    this.x += this.speed;
    if (!this.isDead()) { // Only change direction if not dead
      this.otherDirection = false;
    }
  }

  moveLeft() {
    this.x -= this.speed;
    if (!this.isDead()) { // Only change direction if not dead
      this.otherDirection = true;
    }
  }

  handleVerticalMovement() {
    if (this.isDead()) return; // Don't allow movement when dead
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

  hit(hitType = 'poison', damage = 5) {
    if (this.animation.triggerHit(hitType)) {
      super.hit(damage);
    }
  }

  startSlapping() {
    return this.animation.startSlapping();
  }

  startShooting() {
    return this.animation.startShooting();
  }

  collectBottle() {
    if (this.bottles < this.maxBottles) {
      audioManager.playSound('collect_bottle', false);
      audioManager.setVolume('collect_bottle', 0.2);
      this.bottles++;
      return true; // Successfully collected
    }
    return false; // Already at maximum
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
    this.animation.animationSpeed.swimming = 50;  // Was 100
    this.animation.animationSpeed.slapping = 15; // Was 70
  }
  
  useBottle() {
    if (this.bottles > 0) {
      this.bottles--;
      return true; // Successfully used a bottle
    }
    return false; // No bottles available
  }

  playAnimation(images) {
    this.animation.playCharacterAnimation(images);
  }
}