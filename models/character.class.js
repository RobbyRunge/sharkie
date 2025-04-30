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

  /**
   * Creates a new character instance
   */
  constructor() {
    super();
    this.offsetTop = 95;
    this.offsetBottom = 45;
    this.offsetX = 40;
    this.offsetY = 40; 
    this.animation = new CharacterAnimation(this);
    this.animate();
  }

  /**
   * Sets up character animations and controls
   */
  animate() {
    this.setupControlLoop();
    this.animation.animate();
  }

  /**
   * Sets up the main control loop for the character
   */
  setupControlLoop() {
    setStoppableInterval(() => {
      if (isGameActive) {
        this.controlCharacter();
        this.updateCamera();
      }
    }, 1000 / 160);
  }

  /**
   * Updates the camera position based on character position
   */
  updateCamera() {
    this.world.camera_x = Math.round(-this.x + 100);
  }

  /**
   * Checks if the character is moving in any direction
   * @returns {boolean} True if character is moving
   */
  isMoving() {
    return this.world.keyboard.RIGHT || 
           this.world.keyboard.LEFT || 
           this.world.keyboard.UP || 
           this.world.keyboard.DOWN;
  }

  /**
   * Processes keyboard input to control character movement
   */
  controlCharacter() {
    this.handleHorizontalMovement();
    this.handleVerticalMovement();
    this.updateRotation();
  }

  /**
   * Handles left-right movement based on keyboard input
   */
  handleHorizontalMovement() {
    if (this.isDead()) return; 
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
    }
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft();
    }
  }

  /**
   * Moves the character right
   */
  moveRight() {
    this.x += this.speed;
    if (!this.isDead()) { 
      this.otherDirection = false;
    }
  }

  /**
   * Moves the character left
   */
  moveLeft() {
    this.x -= this.speed;
    if (!this.isDead()) { 
      this.otherDirection = true;
    }
  }

  /**
   * Handles up-down movement based on keyboard input
   */
  handleVerticalMovement() {
    if (this.isDead()) return; 
    if (this.world.keyboard.UP && this.y > -90) {
      this.moveUp();
    }
    if (this.world.keyboard.DOWN && this.y < 320) {
      this.moveDown();
    }
  }

  /**
   * Moves the character up
   */
  moveUp() {
    this.y -= this.speed;
    this.rotation = -10;
  }

  /**
   * Moves the character down
   */
  moveDown() {
    this.y += this.speed;
    this.rotation = 20;
  }

  /**
   * Updates the character's rotation based on movement
   */
  updateRotation() {
    if (!this.world.keyboard.UP && !this.world.keyboard.DOWN) {
      this.rotation = 0;
    }
  }

  /**
   * Triggers hit animation if character can be hit
   * @param {string} hitType - The type of hit (poison, electric)
   * @returns {boolean} True if hit was triggered
   */
  triggerHit(hitType = 'poison') {
    if (!this.isDead() && !this.animation.isHit) {
      this.animation.isHit = true;
      this.animation.hitTime = 0;
      this.animation.hitType = hitType; 
      return true;
    }
    return false;
  }

  /**
   * Applies damage to the character
   * @param {string} hitType - The type of hit (poison, electric)
   * @param {number} damage - Amount of damage to apply
   */
  hit(hitType = 'poison', damage = 5) {
    if (this.triggerHit(hitType)) {
      super.hit(damage);
    }
  }

  /**
   * Starts the slap attack animation
   * @returns {boolean} True if slap attack started
   */
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

  /**
   * Resets the slap attack state
   */
  resetSlapState() {
    this.animation.isSlapping = false;
    this.animation.currentSlapFrame = 0;
  }

  /**
   * Starts the shooting animation
   * @returns {boolean} True if shooting started
   */
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

  /**
   * Resets the shooting state
   */
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

  /**
   * Adds a bottle to the character's inventory
   * @returns {boolean} True if bottle was collected
   */
  collectBottle() {
    if (this.bottles < this.maxBottles) {
      audioManager.playSound('collect_bottle', false);
      audioManager.setVolume('collect_bottle', 0.2);
      this.bottles++;
      return true; 
    }
    return false; 
  }

  /**
   * Adds a coin to the character's inventory
   * @returns {boolean} True if coin was collected
   */
  collectCoins() {
    if (this.coins < this.maxCoins) {
      audioManager.playSound('collect_coin', false);
      audioManager.setVolume('collect_coin', 0.1);
      this.coins++;
      return true;
    }
    return false;
  }

  /**
   * Activates speed boost if character has coins
   * @returns {boolean} True if speed boost was activated
   */
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
  
  /**
   * Checks if speed boost can be activated
   * @returns {boolean} True if speed boost can be activated
   */
  canActivateSpeedBoost() {
    return !this.speedBoostActive && this.coins > 0;
  }
  
  /**
   * Activates the speed boost effect
   */
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
  
  /**
   * Sets a timeout to reset the speed boost
   */
  scheduleSpeedBoostReset() {
    setTimeout(() => {
      this.resetSpeedBoost();
    }, 5000);
  }
  
  /**
   * Resets character speed to normal after boost expires
   */
  resetSpeedBoost() {
    this.speed = this.originalSpeed;
    this.animation.animationSpeed = this.originalAnimationSpeeds;
    this.speedBoostActive = false;
  }
  
  /**
   * Increases animation speeds during speed boost
   */
  higherAnimationSpeed() {
    this.animation.animationSpeed.swimming = 50;  
    this.animation.animationSpeed.slapping = 15; 
  }
  
  /**
   * Uses a bottle from the character's inventory
   * @returns {boolean} True if a bottle was used
   */
  useBottle() {
    if (this.bottles > 0) {
      this.bottles--;
      return true; 
    }
    return false; 
  }

  /**
   * Plays a character animation
   * @param {string[]} images - Array of image paths for the animation
   */
  playAnimation(images) {
    this.animation.playCharacterAnimation(images);
  }
}