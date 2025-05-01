class World {
  character = new Character(); 
  level = level_1; 
  canvas; 
  ctx; 
  keyboard; 
  camera_x = 0; 
  statusBar = new StatusBar();
  coinBar = new CoinBar();
  posionBar = new PosionBar();
  throwableObject = [];
  
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.collisionHandler = new CollisionHandler(this);
    this.renderer = new GameRenderer(this);
    this.setWorld();
    this.run();
    this.updatePoisonBar();
    this.updateCoinBar(); 
    this.renderer.draw();
  }

  /**
   * Sets up the world reference in the character
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Runs the main game loop with periodic checks
   */
  run() {
    setStoppableInterval(() => {
      this.collisionHandler.checkCollisions();
      this.checkThrowObjects();
      this.checkSlapping();
      this.collisionHandler.checkThrowableCollisions(); 
      this.collisionHandler.checkSlapCollisions();
      this.checkSpeedBoost();
      this.cleanupDeadFish();
    }, 100);
  }

  /**
   * Checks if the slap action should be triggered
   */
  checkSlapping() {
    if (this.keyboard.SPACE) {
      this.character.startSlapping();
    }
  }

  /**
   * Handles all throwable object logic
   */
  checkThrowObjects() {
    this.checkStartShooting();
    this.checkCreateProjectile();
  }
  
  /**
   * Checks if the character should start the shooting animation
   */
  checkStartShooting() {
    if (this.keyboard.D && this.character.startShooting()) {
    }
  }
  
  /**
   * Checks if a projectile should be created based on animation state
   */
  checkCreateProjectile() {
    const canCreateProjectile = 
      this.character.animation.shootingHandler.shootingComplete && 
      !this.character.animation.shootingHandler.shootingProcessed && 
      this.character.useBottle();
    if (canCreateProjectile) {
      this.createAndAddProjectile();
      this.updatePoisonBar();
      this.character.animation.shootingHandler.shootingProcessed = true;
    }
  }
  
  /**
   * Creates and adds a new throwable object to the game
   */
  createAndAddProjectile() {
    const projectileX = this.character.x + 100;
    const projectileY = this.character.y + 100;
    let bottle = new ThrowableObject(projectileX, projectileY);
    this.throwableObject.push(bottle);
  }

  /**
   * Removes dead fish from the game world after animation completes
   */
  cleanupDeadFish() {
    for (let i = this.level.enemies.length - 1; i >= 0; i--) {
      const enemy = this.level.enemies[i];
      if (enemy instanceof DestructibleEnemy && enemy.deathAnimationComplete) {
        this.level.enemies.splice(i, 1);
      }
    }
  }

  /**
   * Removes an object from the level's enemies array
   * @param {MoveableObject} object - The object to remove
   */
  removeFromLevel(object) {
    let index = this.level.enemies.indexOf(object);
    if (index > -1) {
      this.level.enemies.splice(index, 1);
    }
  }

  /**
   * Updates the poison bottle collection UI bar
   */
  updatePoisonBar() {
    let percentage = (this.character.bottles / this.character.maxBottles) * 100;
    this.posionBar.setPercentage(percentage);
  }

  /**
   * Updates the coin collection UI bar
   */
  updateCoinBar() {
    let percentage = (this.character.coins / this.character.maxCoins) * 100;
    this.coinBar.setPercentage(percentage);
  }

  /**
   * Stops the game and cleans up resources
   */
  stopGame() {
    isGameActive = false;
    intervalIds.forEach(clearInterval);
    audioManager.stopAllSounds();
  }

  /**
   * Activates speed boost when 'E' key is pressed
   * Uses collected coins to temporarily increase character speed
   */
  checkSpeedBoost() {
    if (this.keyboard.E) {
      this.character.multiplySpeedByCollectCoins();
      this.keyboard.E = false;
    }
  }
}