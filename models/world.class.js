class World {
  character = new Character(); 
  level = level_1; 
  canvas; 
  ctx; 
  keyboard; 
  camera_x = 0; 
  statusBar =  new StatusBar();
  coinBar = new CoinBar();
  posionBar = new PosionBar();
  throwableObject = [];
  SLAP_RANGE = 30; 

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.updatePoisonBar();
    this.updateCoinBar(); 
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setStoppableInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
      this.checkSlapping();
      this.checkThrowableCollisions(); 
      this.checkSlapCollisions();
      this.checkSpeedBoost();
      this.cleanupDeadFish();
    }, 100);
  }

  checkSlapping() {
    if (this.keyboard.SPACE) {
      this.character.startSlapping();
    }
  }

  checkThrowObjects() {
    this.checkStartShooting();
    this.checkCreateProjectile();
  }
  
  checkStartShooting() {
    if (this.keyboard.D && this.character.startShooting()) {
    }
  }
  
  checkCreateProjectile() {
    const canCreateProjectile = 
      this.character.animation.shootingComplete && 
      !this.character.animation.shootingProcessed && 
      this.character.useBottle();
    if (canCreateProjectile) {
      this.createAndAddProjectile();
      this.updatePoisonBar();
      this.character.animation.shootingProcessed = true;
    }
  }
  
  createAndAddProjectile() {
    const projectileX = this.character.x + 100;
    const projectileY = this.character.y + 100;
    let bottle = new ThrowableObject(projectileX, projectileY);
    this.throwableObject.push(bottle);
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
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
  
  checkThrowableCollisions() {
    this.throwableObject.forEach((bottle, index) => {
      if (bottle.isColliding(this.level.enemies.find(e => e instanceof Endboss))) {        
        this.level.enemies.find(e => e instanceof Endboss).hit('bottle');
        this.throwableObject.splice(index, 1);
      }
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy) && enemy instanceof DestructibleEnemy && !enemy.isDying) {
          enemy.die();
          this.throwableObject.splice(index, 1);
        }
      });
    });
  }

  checkSlapCollisions() {
    if (this.isSlapActive()) {
      const slapX = this.getSlapPosition();
      const endboss = this.level.enemies.find(e => e instanceof Endboss);
      if (endboss && this.isInSlapRange(endboss, slapX)) {
        endboss.hit('slap');
      }
      this.level.enemies.forEach((enemy) => {
        this.checkEnemySlapCollision(enemy, slapX);
      });
    }
  }
  
  isSlapActive() {
    return this.character.animation.isSlapping && 
           this.character.animation.currentSlapFrame >= 4 && 
           this.character.animation.currentSlapFrame <= 7;
  }
  
  getSlapPosition() {
    return this.character.otherDirection ? 
      this.character.x - this.SLAP_RANGE : // Left slap
      this.character.x + this.character.width; // Right slap
  }
  
  checkEnemySlapCollision(enemy, slapX) {
    if (enemy instanceof DestructibleEnemy) {
      if (this.isInSlapRange(enemy, slapX)) {
        enemy.die();
      }
    }
  }
  
  isInSlapRange(enemy, slapX) {
    return this.isInHorizontalSlapRange(enemy, slapX) && 
           this.isInVerticalSlapRange(enemy);
  }
  
  isInHorizontalSlapRange(enemy, slapX) {
    return this.character.otherDirection ? 
      (enemy.x + enemy.width >= slapX && enemy.x <= this.character.x) : // Left slap range
      (enemy.x <= slapX + this.SLAP_RANGE && enemy.x + enemy.width >= slapX); // Right slap range
  }
  
  isInVerticalSlapRange(enemy) {
    return enemy.y + enemy.height >= this.character.y + 80 && 
           enemy.y <= this.character.y + this.character.height - 40;
  }

  cleanupDeadFish() {
    for (let i = this.level.enemies.length - 1; i >= 0; i--) {
      const enemy = this.level.enemies[i];
      if (enemy instanceof DestructibleEnemy && enemy.deathAnimationComplete) {
        this.level.enemies.splice(i, 1);
      }
    }
  }

  handlePoisonCollision(poisonBottle) {
    if (this.character.collectBottle()) {
      this.removeFromLevel(poisonBottle);
      this.updatePoisonBar();
    }
  }

  handleCoinCollision(coin) {
    if (this.character.collectCoins()) {
      this.removeFromLevel(coin);
      this.updateCoinBar();
    }
  }
  
  handleEnemyCollision(enemy) {
    let hitType = 'poison'; 
    let damage = 5; 
    if (enemy instanceof GreenJellyFish || enemy instanceof PinkJellyFish) {
      hitType = 'electric';
      damage = 15; 
    }
    this.character.hit(hitType, damage);
    this.statusBar.setPercentage(this.character.energy);
  }
  
  removeFromLevel(object) {
    let index = this.level.enemies.indexOf(object);
    if (index > -1) {
      this.level.enemies.splice(index, 1);
    }
  }

  updatePoisonBar() {
    let percentage = (this.character.bottles / this.character.maxBottles) * 100;
    this.posionBar.setPercentage(percentage);
  }

  updateCoinBar() {
    let percentage = (this.character.coins / this.character.maxCoins) * 100;
    this.coinBar.setPercentage(percentage);
  }

  draw() {
    if (!isGameActive) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObject);
    this.addObjectsToMap(this.throwableObject); 
    
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.posionBar);
    this.ctx.translate(this.camera_x, 0);

    this.ctx.translate(-this.camera_x, 0);
    let self = this;
    if (isGameActive) {
      requestAnimationFrame(function() {
        self.draw();
      });
    }
  }

  addObjectsToMap(objects) {
    objects.forEach(o => {
      this.addToMap(o);
    });
  }

  addToMap(moveableObject) {
    this.ctx.save();    
    if (moveableObject instanceof Character) {
      this.drawRotatedObject(moveableObject);
    } else {
      this.drawObject(moveableObject);
    }
    this.ctx.restore();
  }

  drawRotatedObject(moveableObject) {
    this.moveToObjectCenter(moveableObject);
    this.applyDirectionAndRotation(moveableObject);
    this.moveToObjectTopLeft(moveableObject);
    this.drawObjectAtOrigin(moveableObject);
  }

  moveToObjectCenter(moveableObject) {
    this.ctx.translate(
      moveableObject.x + moveableObject.width/2, 
      moveableObject.y + moveableObject.height/2
    );
  }

  applyDirectionAndRotation(moveableObject) {
    if (moveableObject.otherDirection) {
      this.ctx.scale(-1, 1);
    }
    this.ctx.rotate(moveableObject.rotation * Math.PI / 180);
  }

  moveToObjectTopLeft(moveableObject) {
    this.ctx.translate(
      -(moveableObject.width/2), 
      -(moveableObject.height/2)
    );
  }

  drawObjectAtOrigin(moveableObject) {
    moveableObject.draw(this.ctx, 0, 0);
  }

  drawObject(moveableObject) {
    if (moveableObject.otherDirection) {
      this.flipImageHorizontally(moveableObject);
    }
    this.drawAndFrameObject(moveableObject);
    if (moveableObject.otherDirection) {
      this.restoreOriginalDirection(moveableObject);
    }
  }

  flipImageHorizontally(moveableObject) {
    this.ctx.save();
    this.ctx.translate(moveableObject.width, 0);
    this.ctx.scale(-1, 1);
    moveableObject.x = moveableObject.x * -1;
  }

  drawAndFrameObject(moveableObject) {
    moveableObject.draw(this.ctx);
  }

  restoreOriginalDirection(moveableObject) {
    moveableObject.x = moveableObject.x * -1;
    this.ctx.restore();
  }

  stopGame() {
    isGameActive = false;
    intervalIds.forEach(clearInterval);
    audioManager.stopAllSounds();
  }
  
  showGameOverScreen() {
    audioManager.playSound('game_over');
    audioManager.setVolume('game_over', 0.3);
    document.body.insertAdjacentHTML('beforeend', getGameOverTemplate());
    document.getElementById('retry_button').addEventListener('click', () => {
      document.getElementById('game_over_screen').remove();
      init();
    });
    document.getElementById('menu_button').addEventListener('click', () => {
      document.getElementById('game_over_screen').remove();
      goBackToStartscreen();
    });
  }

  showWinScreen() {
    audioManager.playSound('win');
    audioManager.setVolume('win', 0.3);
    document.body.insertAdjacentHTML('beforeend', getWinTemplate());
    document.getElementById('play_again_button').addEventListener('click', () => {
      document.getElementById('win_screen').remove();
      init();
    });
    document.getElementById('win_menu_button').addEventListener('click', () => {
      document.getElementById('win_screen').remove();
      goBackToStartscreen();
    });
  }

  checkSpeedBoost() {
    if (this.keyboard.E) {
      this.character.multiplySpeedByCollectCoins();
      this.keyboard.E = false;
    }
  }
}