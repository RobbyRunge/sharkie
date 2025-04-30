class LilaJellyFish extends DestructibleEnemy {
  width = 50;
  x = 0;
  height = 50;
  y = 200;
  
  IMAGES_SWIMMING = [
    './img/2.Enemy/2.Jelly_fish/Regular damage/Yellow 2.png',
    './img/2.Enemy/2.Jelly_fish/Regular damage/Yellow 3.png',
    './img/2.Enemy/2.Jelly_fish/Regular damage/Yellow 4.png',
    './img/2.Enemy/2.Jelly_fish/Regular damage/Yellow 1.png'
  ];

  IMAGES_DEAD = [
    './img/2.Enemy/2.Jelly_fish/Dead/Yellow/y1.png',
    './img/2.Enemy/2.Jelly_fish/Dead/Yellow/y2.png',
    './img/2.Enemy/2.Jelly_fish/Dead/Yellow/y3.png',
    './img/2.Enemy/2.Jelly_fish/Dead/Yellow/y4.png',
  ];

  /**
   * Creates a new LilaJellyFish at a random position
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
   * Initializes animation for this jellyfish
   */
  animate() {
    this.startAnimation();
  }

  /**
   * Sets up animation intervals for swimming and death animations
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