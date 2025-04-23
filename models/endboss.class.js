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

  constructor() {
    // Initialize position and animations
    super().loadImage('img/2.Enemy/3.Final_Enemy/1.Introduce/1.png'); // Load first image but don't show yet
    this.loadImages(this.IMAGES_STAND);
    this.loadImages(this.IMAGES_SPAWNING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HIT);
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
      console.log('Character X:', world.character.x); // Debugging line to check character position
      this.checkFirstContact();
      if (this.visible) {
        this.playAnimations();
        this.checkAttackRange(); // Check if within attack range
      }
    }, 120);
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
    if (this.animationStarted && this.animationFrame < 10) {
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

  // Override the draw method from parent class
  draw(ctx) {
    if (this.visible) {
      super.draw(ctx); // Only draw if visible
    }
  }
}