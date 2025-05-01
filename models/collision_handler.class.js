class CollisionHandler {

  constructor(world) {
    this.world = world;
    this.SLAP_RANGE = 30;
  }

  /**
   * Checks all possible collisions between character and enemies
   * Handles different types of collisions based on enemy type
   */
  checkCollisions() {
    this.world.level.enemies.forEach((enemy) => {
      if (this.world.character.isColliding(enemy)) {
        if (enemy instanceof Posion) {
          this.handlePoisonCollision(enemy);
        } else if (enemy instanceof Coin) {
          this.handleCoinCollision(enemy);
        } else {
          this.handleEnemyCollision(enemy);
        }
      }
    });
  }
  
  /**
   * Checks and handles all collisions between throwable objects and enemies
   * Handles different logic for endboss vs destructible enemies
   */
  checkThrowableCollisions() {
    this.world.throwableObject.forEach((bottle, index) => {
      if (bottle.isColliding(this.world.level.enemies.find(e => e instanceof Endboss))) {        
        this.world.level.enemies.find(e => e instanceof Endboss).hit('bottle');
        this.world.throwableObject.splice(index, 1);
      }
      this.world.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy) && enemy instanceof DestructibleEnemy && !enemy.isDying) {
          enemy.die();
          this.world.throwableObject.splice(index, 1);
        }
      });
    });
  }

  /**
   * Checks for collisions from the slapping action
   * Only processes during active slap animation frames
   */
  checkSlapCollisions() {
    if (this.isSlapActive()) {
      const slapX = this.getSlapPosition();
      const endboss = this.world.level.enemies.find(e => e instanceof Endboss);
      if (endboss && this.isInSlapRange(endboss, slapX)) {
        endboss.hit('slap');
      }
      this.world.level.enemies.forEach((enemy) => {
        this.checkEnemySlapCollision(enemy, slapX);
      });
    }
  }
  
  /**
   * Determines if the slap animation is currently in the active frames
   * @returns {boolean} True if slap is in active animation frames
   */
  isSlapActive() {
    return this.world.character.animation.isSlapping && 
           this.world.character.animation.currentSlapFrame >= 4 && 
           this.world.character.animation.currentSlapFrame <= 7;
  }
  
  /**
   * Gets the x-position of the slap based on character direction
   * @returns {number} The x-coordinate of the slap hit area
   */
  getSlapPosition() {
    return this.world.character.otherDirection ? 
      this.world.character.x - this.SLAP_RANGE :
      this.world.character.x + this.world.character.width; 
  }
  
  /**
   * Checks if an enemy is affected by the character's slap
   * @param {Enemy} enemy - The enemy to check
   * @param {number} slapX - The x-coordinate of the slap
   */
  checkEnemySlapCollision(enemy, slapX) {
    if (enemy instanceof DestructibleEnemy) {
      if (this.isInSlapRange(enemy, slapX)) {
        enemy.die();
      }
    }
  }
  
  /**
   * Determines if an enemy is in range of the slap attack
   * @param {Enemy} enemy - The enemy to check
   * @param {number} slapX - The x-coordinate of the slap
   * @returns {boolean} True if enemy is in slap range
   */
  isInSlapRange(enemy, slapX) {
    return this.isInHorizontalSlapRange(enemy, slapX) && 
           this.isInVerticalSlapRange(enemy);
  }
  
  /**
   * Checks if an enemy is in horizontal range of the slap
   * @param {Enemy} enemy - The enemy to check
   * @param {number} slapX - The x-coordinate of the slap
   * @returns {boolean} True if enemy is in horizontal slap range
   */
  isInHorizontalSlapRange(enemy, slapX) {
    return this.world.character.otherDirection ? 
      (enemy.x + enemy.width >= slapX && enemy.x <= this.world.character.x) : 
      (enemy.x <= slapX + this.SLAP_RANGE && enemy.x + enemy.width >= slapX); 
  }
  
  /**
   * Checks if an enemy is in vertical range of the slap
   * @param {Enemy} enemy - The enemy to check
   * @returns {boolean} True if enemy is in vertical slap range
   */
  isInVerticalSlapRange(enemy) {
    return enemy.y + enemy.height >= this.world.character.y + 80 && 
           enemy.y <= this.world.character.y + this.world.character.height - 40;
  }

  /**
   * Handles collision with a poison bottle
   * @param {Posion} poisonBottle - The poison bottle object
   */
  handlePoisonCollision(poisonBottle) {
    if (this.world.character.collectBottle()) {
      this.world.removeFromLevel(poisonBottle);
      this.world.updatePoisonBar();
    }
  }

  /**
   * Handles collision with a coin
   * @param {Coin} coin - The coin object
   */
  handleCoinCollision(coin) {
    if (this.world.character.collectCoins()) {
      this.world.removeFromLevel(coin);
      this.world.updateCoinBar();
    }
  }
  
  /**
   * Handles collision with an enemy that damages the character
   * Different enemies cause different damage types and amounts
   * @param {Enemy} enemy - The enemy object
   */
  handleEnemyCollision(enemy) {
    let hitType = 'poison'; 
    let damage = 5; 
    if (enemy instanceof GreenJellyFish || enemy instanceof PinkJellyFish) {
      hitType = 'electric';
      damage = 15; 
    }
    this.world.character.hit(hitType, damage);
    this.world.statusBar.setPercentage(this.world.character.energy);
  }
}