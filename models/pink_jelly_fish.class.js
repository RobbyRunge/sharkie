class PinkJellyFish extends DestructibleEnemy {
  width = 80;
  x = 0;
  height = 80;
  y = 200;
  
  IMAGES_SWIMMING = [
    './img/2.Enemy/2.Jelly_fish/Súper dangerous/Pink 4.png',
    './img/2.Enemy/2.Jelly_fish/Súper dangerous/Pink 1.png',
    './img/2.Enemy/2.Jelly_fish/Súper dangerous/Pink 2.png',
    './img/2.Enemy/2.Jelly_fish/Súper dangerous/Pink 3.png',
  ];

  IMAGES_DEAD = [
    './img/2.Enemy/2.Jelly_fish/Dead/Pink/P1.png',
    './img/2.Enemy/2.Jelly_fish/Dead/Pink/P2.png',
    './img/2.Enemy/2.Jelly_fish/Dead/Pink/P3.png',
    './img/2.Enemy/2.Jelly_fish/Dead/Pink/P4.png',
  ];

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

  animate() {
    this.startAnimation();
  }

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