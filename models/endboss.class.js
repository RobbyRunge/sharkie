class Endboss extends MoveableObject {
  // Final boss enemy
  height = 500;
  y = -70;
  width = 350;
  speed = 0.8; // Speed of the endboss
  hadFirstContact = false; // Flag to check if the endboss has made first contact with the character
  visible = false; // Add this flag to track visibility
  isAttacking = false; // Add this property to track attack state
  lastAttackTime = 0; // Track when the last attack finished
  attackCooldown = 2000; // 2 seconds cooldown
  currentAttackFrame = 0; // Track which frame of attack animation is playing
  
  // Add properties for hit system
  energy = 100; // Health - 5 hits of 20 damage each to kill
  isHit = false; // Track if currently in hit animation
  hitAnimationTimer = 0; // Timer for hit animation
  isDying = false; // Track if dying
  deathAnimationIndex = 0; // Track death animation progress
  isInvulnerable = false; // Track invulnerability state

  IMAGES_SPAWNING = [
    // Spawning animation frames
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
    // Floating animation frames
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
    // Attack animation frames
    './img/2.Enemy/3.Final_Enemy/Attack/1.png',
    './img/2.Enemy/3.Final_Enemy/Attack/2.png',
    './img/2.Enemy/3.Final_Enemy/Attack/3.png',
    './img/2.Enemy/3.Final_Enemy/Attack/4.png',
    './img/2.Enemy/3.Final_Enemy/Attack/5.png',
    './img/2.Enemy/3.Final_Enemy/Attack/6.png',
  ];

  IMAGES_HIT = [
    // Hit animation frames
    './img/2.Enemy/3.Final_Enemy/Hurt/1.png',
    './img/2.Enemy/3.Final_Enemy/Hurt/2.png',
    './img/2.Enemy/3.Final_Enemy/Hurt/3.png',
    './img/2.Enemy/3.Final_Enemy/Hurt/4.png',
  ];

  IMAGES_DEAD = [
    // Dead animation frames
    './img/2.Enemy/3.Final_Enemy/Dead/Mesa de trabajo 2 copia 6.png',
    './img/2.Enemy/3.Final_Enemy/Dead/Mesa de trabajo 2 copia 7.png',
    './img/2.Enemy/3.Final_Enemy/Dead/Mesa de trabajo 2 copia 8.png',
    './img/2.Enemy/3.Final_Enemy/Dead/Mesa de trabajo 2 copia 9.png',
    './img/2.Enemy/3.Final_Enemy/Dead/Mesa de trabajo 2 copia 10.png',
    './img/2.Enemy/3.Final_Enemy/Dead/Mesa de trabajo 2.png'
  ];

  constructor() {
    // Initialize position and animations
    super().loadImage('img/2.Enemy/3.Final_Enemy/1.Introduce/1.png'); // Load first image but don't show yet
    this.loadImages(this.IMAGES_STAND);
    this.loadImages(this.IMAGES_SPAWNING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HIT);
    this.loadImages(this.IMAGES_DEAD); // Load death animation images
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
          this.checkAttackRange(); // Only check attack range when not hit or dying
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
    console.log(`By ${attackType}! Health: ${this.energy}/100 (Damage: ${actualDamage})`); // Debug info
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
    this.x += 15; 
    this.speed = 0; 
    setTimeout(() => {
      this.speed = 0.8;
    }, 1000); 
  }

  applySlapHitEffects() {
    this.x += 5; 
    this.speed = 0; 
    setTimeout(() => {
      this.speed = 0.8;
    }, 1000); 
  }

  die() {
    console.log('Endboss dying!');
    this.isDying = true;
    this.isHit = false;
    this.isAttacking = false;
    this.speed = 0; // Stop movement
    this.deathAnimationIndex = 0;
  }

  checkAttackRange() {
    const currentTime = new Date().getTime();
    const cooldownElapsed = currentTime - this.lastAttackTime > this.attackCooldown;
    const inAttackRange = world.character.x < this.x + 350 && world.character.x > this.x - 350;
    // Start attack if in range and cooldown has elapsed
    if (inAttackRange && !this.isAttacking && cooldownElapsed) {
      this.startAttackAnimation();
    }
    // End attack if out of range (even during attack)
    else if (!inAttackRange && this.isAttacking) {
      this.endAttackAnimation();
    }
  }

  startAttackAnimation() {
    this.isAttacking = true;
    this.currentAttackFrame = 0; // Reset attack animation frame
  }

  endAttackAnimation() {
    this.isAttacking = false;
  }

  checkFirstContact() {
    if (world.character.x > 2000 && !this.hadFirstContact) {
      this.visible = true; // Make boss visible
      this.hadFirstContact = true; // Set the flag to true after first contact
      this.animationStarted = true; // Start animation sequence
      this.animationFrame = 0; // Ensure we start from the beginning of the spawning animation
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
      // Play spawning animation first
      this.playAnimation(this.IMAGES_SPAWNING);
    } else if (this.isAttacking) {
      // Play attack animation
      this.playAnimation(this.IMAGES_ATTACK);
      // Track attack frame and handle attack completion
      this.currentAttackFrame++;
      if (this.currentAttackFrame >= this.IMAGES_ATTACK.length) {
        this.lastAttackTime = new Date().getTime();
        this.isAttacking = false;
        this.currentAttackFrame = 0;
      }
    } else {
      // Switch to standing animation
      this.playAnimation(this.IMAGES_STAND);
    }
    if (this.animationStarted) this.animationFrame++;
  }

  playHitAnimation() {
    // Play through hit images
    let index = Math.min(Math.floor(this.hitAnimationTimer / 2), this.IMAGES_HIT.length - 1);
    this.img = this.imageCache[this.IMAGES_HIT[index]];
    // Increment timer and check if animation is complete
    this.hitAnimationTimer++;
    if (this.hitAnimationTimer >= this.IMAGES_HIT.length * 2) {
      this.isHit = false;
      this.hitAnimationTimer = 0;
    }
  }

  playDeathAnimation() {
    if (this.deathAnimationIndex < this.IMAGES_DEAD.length) {
      this.img = this.imageCache[this.IMAGES_DEAD[this.deathAnimationIndex]];
      // Slow down death animation by changing frame every 3 cycles
      if (this.animationFrame % 3 === 0) {
        this.deathAnimationIndex++;
      }
    }
    if (this.deathAnimationIndex >= this.IMAGES_DEAD.length) {
      world.stopGame();
      world.gameWon = true;
      world.showWinScreen();
    }
  }

  draw(ctx) {
    if (this.visible) {
      super.draw(ctx); // Only draw if visible
    }
  }
}