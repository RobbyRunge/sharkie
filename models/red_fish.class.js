class RedFish extends DestructibleEnemy {
  width = 80;
  x = 0;
  height = 80;
  y = 200;
  
  IMAGES_SWIMMING = [
    './img/2.Enemy/1.Puffer_fish(3_color_options)/1.Swim/3.swim4.png',
    './img/2.Enemy/1.Puffer_fish(3_color_options)/1.Swim/3.swim5.png',
    './img/2.Enemy/1.Puffer_fish(3_color_options)/1.Swim/3.swim4.png',
    './img/2.Enemy/1.Puffer_fish(3_color_options)/2.transition/3.transition3.png',
    './img/2.Enemy/1.Puffer_fish(3_color_options)/1.Swim/3.swim2.png',
    './img/2.Enemy/1.Puffer_fish(3_color_options)/1.Swim/3.swim1.png',
    './img/2.Enemy/1.Puffer_fish(3_color_options)/1.Swim/3.swim2.png',
    './img/2.Enemy/1.Puffer_fish(3_color_options)/1.Swim/3.swim3.png',
  ];

  IMAGES_DEAD = [
    './img/2.Enemy/1.Puffer_fish(3_color_options)/4.DIE/dead_fish_3_1.png',
    './img/2.Enemy/1.Puffer_fish(3_color_options)/4.DIE/dead_fish_3_2.png',
    './img/2.Enemy/1.Puffer_fish(3_color_options)/4.DIE/dead_fish_3_3.png',
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
    this.offsetBottom = 20; 
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