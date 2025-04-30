class YellowJellyFish extends DestructibleEnemy {
  width = 70;
  x = 0;
  height = 70;
  y = 200;
  
  IMAGES_SWIMMING = [
    './img/2.Enemy/2.Jelly_fish/Regular damage/Lila 1.png',
    './img/2.Enemy/2.Jelly_fish/Regular damage/Lila 2.png',
    './img/2.Enemy/2.Jelly_fish/Regular damage/Lila 3.png',
    './img/2.Enemy/2.Jelly_fish/Regular damage/Lila 4.png'
  ];

  IMAGES_DEAD = [
    './img/2.Enemy/2.Jelly_fish/Dead/Lila/L1.png',
    './img/2.Enemy/2.Jelly_fish/Dead/Lila/L2.png',
    './img/2.Enemy/2.Jelly_fish/Dead/Lila/L3.png',
    './img/2.Enemy/2.Jelly_fish/Dead/Lila/L4.png',
  ];

  /**
   * Creates a new YellowJellyFish enemy instance
   * Sets initial position, loads images and starts animations
   */
  constructor() {
    super();
    this.loadImage(this.IMAGES_SWIMMING[0]);
    this.x = 600 + Math.random() * 2500;
    this.y = 0 + Math.random() * 410;
    this.speed = 0.15 + Math.random() * 0.5;
    this.offsetLeft = 4;
    this.offsetRight = 6;
    this.offsetTop = 0;
    this.offsetBottom = 0; 
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_DEAD);
    this.startMovement();
    this.animate();
  }

  /**
   * Initializes the animation sequence for the jellyfish
   */
  animate() {
    this.startAnimation();
  }

  /**
   * Sets up interval-based animation for the jellyfish
   * Handles both normal swimming and death animations
   */
  startAnimation() {
    setStoppableInterval(() => {
      if (isGameActive) {
        if (this.isDying) {
          this.playDeathAnimation();
        } else { 
          this.playAnimation(this.IMAGES_SWIMMING);
        }
      }
    }, 120);
  }
}