class StatusBar extends DrawableObject {
  percentage = 100;

  IMAGES_HEALTH = [
    './img/4.Marcadores/green/Life/0.png', // 0
    './img/4.Marcadores/green/Life/20.png',
    './img/4.Marcadores/green/Life/40.png',
    './img/4.Marcadores/green/Life/60.png',
    './img/4.Marcadores/green/Life/80.png',
    './img/4.Marcadores/green/Life/100.png' // 5
  ];

  constructor() {
    super();
    this.loadImages(this.IMAGES_HEALTH);
    this.x = 10;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
  }

  // stePercentage(50);
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }  
    
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
