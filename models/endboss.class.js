class Endboss extends MoveableObject {
  height = 500;
  y = -70;
  width = 350;
  speed = 0.8; 
  hadFirstContact = false;
  visible = false; 
  isAttacking = false;
  lastAttackTime = 0; 
  attackCooldown = 2000; 
  currentAttackFrame = 0; 
  energy = 100; 
  isHit = false; 
  hitAnimationTimer = 0; 
  isDying = false; 
  deathAnimationIndex = 0; 
  isInvulnerable = false; 

  IMAGES_SPAWNING = [
    'img/2.Enemy/3.Final_Enemy/1.Introduce/1.png',
    'img/2.Enemy/3.Final_Enemy/1.Introduce/2.png',
    'img/2.Enemy/3.Final_Enemy/1.Introduce/3.png',
    'img/2.Enemy/3.Final_Enemy/1.Introduce/4.png',
    'img/2.Enemy/3.Final_Enemy/1.Introduce/5.png',
    'img/2.Enemy/3.Final_Enemy/1.Introduce/6.png',
    'img/2.Enemy/3.Final_Enemy/1.Introduce/7.png',
    'img/2.Enemy/3.Final_Enemy/1.Introduce/8.png',
    'img/2.Enemy/3.Final_Enemy/1.Introduce/9.png',
    'img/2.Enemy/3.Final_Enemy/1.Introduce/10.png'
  ];

  IMAGES_STAND = [
    './img/2.Enemy/3.Final_Enemy/2.floating/1.png',
    './img/2.Enemy/3.Final_Enemy/2.floating/2.png',
    './img/2.Enemy/3.Final_Enemy/2.floating/3.png',
    './img/2.Enemy/3.Final_Enemy/2.floating/4.png',
    './img/2.Enemy/3.Final_Enemy/2.floating/5.png',
    './img/2.Enemy/3.Final_Enemy/2.floating/6.png',
    './img/2.Enemy/3.Final_Enemy/2.floating/7.png',
    './img/2.Enemy/3.Final_Enemy/2.floating/8.png',
    './img/2.Enemy/3.Final_Enemy/2.floating/9.png',
    './img/2.Enemy/3.Final_Enemy/2.floating/10.png',
    './img/2.Enemy/3.Final_Enemy/2.floating/11.png',
    './img/2.Enemy/3.Final_Enemy/2.floating/12.png',
    './img/2.Enemy/3.Final_Enemy/2.floating/13.png',
  ];

  IMAGES_ATTACK = [
    './img/2.Enemy/3.Final_Enemy/Attack/1.png',
    './img/2.Enemy/3.Final_Enemy/Attack/2.png',
    './img/2.Enemy/3.Final_Enemy/Attack/3.png',
    './img/2.Enemy/3.Final_Enemy/Attack/4.png',
    './img/2.Enemy/3.Final_Enemy/Attack/5.png',
    './img/2.Enemy/3.Final_Enemy/Attack/6.png',
  ];

  IMAGES_HIT = [
    './img/2.Enemy/3.Final_Enemy/Hurt/1.png',
    './img/2.Enemy/3.Final_Enemy/Hurt/2.png',
    './img/2.Enemy/3.Final_Enemy/Hurt/3.png',
    './img/2.Enemy/3.Final_Enemy/Hurt/4.png',
  ];

  IMAGES_DEAD = [
    './img/2.Enemy/3.Final_Enemy/Dead/Mesa de trabajo 2 copia 6.png',
    './img/2.Enemy/3.Final_Enemy/Dead/Mesa de trabajo 2 copia 7.png',
    './img/2.Enemy/3.Final_Enemy/Dead/Mesa de trabajo 2 copia 8.png',
    './img/2.Enemy/3.Final_Enemy/Dead/Mesa de trabajo 2 copia 9.png',
    './img/2.Enemy/3.Final_Enemy/Dead/Mesa de trabajo 2 copia 10.png',
  ];

  constructor() {
    super().loadImage('img/2.Enemy/3.Final_Enemy/1.Introduce/1.png');
    this.loadImages(this.IMAGES_STAND);
    this.loadImages(this.IMAGES_SPAWNING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HIT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 2400;
    this.offsetTop = 125;
    this.offsetBottom = 70;
    this.offsetLeft = 15;
    this.offsetRight = 15;
    this.animate();   
  }  

  animate() {
    this.animationFrame = 0;
    this.animationStarted = false;
    setStoppableInterval(() => {
      if (!isGameActive) return;      
      this.checkFirstContact();
      if (this.visible) {
        this.playAnimations();
        if (!this.isDying && !this.isHit) {
          this.checkAttackRange();
        }
      }
    }, 120);
  }

  hit(attackType = 'bottle') {
    if (this.isDying || this.isInvulnerable) {
      return;
    }
    attackType = String(attackType).toLowerCase();
    const actualDamage = this.calculateDamage(attackType);
    this.applyDamage(actualDamage);
    if (this.checkForDeath()) {
      return;
    }
    this.startHitReaction(attackType);
  }

  calculateDamage(attackType) {
    if (attackType === 'slap') {
      return 10; 
    } else {
      return 20; 
    }
  }

  applyDamage(damage) {
    this.energy -= damage;
    if (this.energy < 0) this.energy = 0;
    this.isInvulnerable = true;
    setTimeout(() => {
      this.isInvulnerable = false;
    }, 500);
  }

  checkForDeath() {
    if (this.energy <= 0) {
      this.die();
      return true;
    }
    return false;
  }

  startHitReaction(attackType) {
    this.isHit = true;
    this.isAttacking = false; 
    this.hitAnimationTimer = 0;
    if (attackType === 'bottle') {
      this.applyBottleHitEffects();
    } else if (attackType === 'slap') {
      this.applySlapHitEffects();
    }
  }

  applyBottleHitEffects() {
    audioManager.playSound('hit_by_bottle');
    audioManager.setVolume('hit_by_bottle', 0.3); 
    this.x += 15; 
    this.speed = 0; 
    setTimeout(() => {
      this.speed = 0.8;
    }, 1000); 
  }

  applySlapHitEffects() {
    audioManager.playSound('hit_by_fin_slap');
    audioManager.setVolume('hit_by_fin_slap', 0.3); 
    this.x += 5; 
    this.speed = 0; 
    setTimeout(() => {
      this.speed = 0.8;
    }, 1000); 
  }

  die() {
    this.isDying = true;
    this.isHit = false;
    this.isAttacking = false;
    this.speed = 0; 
    this.deathAnimationIndex = 0;
  }

  checkAttackRange() {
    const currentTime = new Date().getTime();
    const cooldownElapsed = currentTime - this.lastAttackTime > this.attackCooldown;
    const inAttackRange = world.character.x < this.x + 350 && world.character.x > this.x - 350;
    if (inAttackRange && !this.isAttacking && cooldownElapsed) {
      this.startAttackAnimation();
    }
    else if (!inAttackRange && this.isAttacking) {
      this.endAttackAnimation();
    }
  }

  startAttackAnimation() {
    this.isAttacking = true;
    this.currentAttackFrame = 0;
  }

  endAttackAnimation() {
    this.isAttacking = false;
  }

  checkFirstContact() {
    if (world.character.x > 2000 && !this.hadFirstContact) {
      this.visible = true;
      this.hadFirstContact = true;
      this.animationStarted = true;
      this.animationFrame = 0;
      this.startMovementEndboss();
    }
  }

  startMovementEndboss() {
    setStoppableInterval(() => {
      if (isGameActive && !this.isDying) {
        this.x -= this.speed;
      }
    }, 1000/60);
  }

  playAnimations() {
    if (this.isDying) {
      this.playDeathAnimation();
    } else if (this.isHit) {
      this.playHitAnimation();
    } else if (this.animationStarted && this.animationFrame < 10) {
      this.playAnimation(this.IMAGES_SPAWNING);
    } else if (this.isAttacking) {
      this.playAnimation(this.IMAGES_ATTACK);
      this.currentAttackFrame++;
      if (this.currentAttackFrame >= this.IMAGES_ATTACK.length) {
        this.lastAttackTime = new Date().getTime();
        this.isAttacking = false;
        this.currentAttackFrame = 0;
      }
    } else {
      this.playAnimation(this.IMAGES_STAND);
    }
    if (this.animationStarted) this.animationFrame++;
  }

  playHitAnimation() {
    let index = Math.min(Math.floor(this.hitAnimationTimer / 2), this.IMAGES_HIT.length - 1);
    this.img = this.imageCache[this.IMAGES_HIT[index]];
    this.hitAnimationTimer++;
    if (this.hitAnimationTimer >= this.IMAGES_HIT.length * 2) {
      this.isHit = false;
      this.hitAnimationTimer = 0;
    }
  }

  playDeathAnimation() {
    if (this.deathAnimationIndex < this.IMAGES_DEAD.length) {
      this.img = this.imageCache[this.IMAGES_DEAD[this.deathAnimationIndex]];
      if (this.animationFrame % 3 === 0) {
        this.deathAnimationIndex++;
      }
    }
    if (this.deathAnimationIndex >= this.IMAGES_DEAD.length) {
      closeFullscreen(); 
      world.stopGame();
      world.gameWon = true;
      world.showWinScreen();
    }
  }

  draw(ctx) {
    if (this.visible) {
      super.draw(ctx);
    }
  }
}