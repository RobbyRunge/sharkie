class Coin extends MoveableObject {
  IMAGES_COIN = [
    './img/4.Marcadores/1. Coins/1.png',
    './img/4.Marcadores/1. Coins/2.png',
    './img/4.Marcadores/1. Coins/3.png',
    './img/4.Marcadores/1. Coins/4.png',
  ];

  /**
   * Creates a new coin at a random position
   */
  constructor() {
    super();
    this.loadImage(this.IMAGES_COIN[0]);
    this.loadImages(this.IMAGES_COIN);
    this.x = 400 + Math.random() * 2000; 
    this.y = 50 + Math.random() * 300;   
    this.width = 40;
    this.height = 40;
    this.offsetTop = 10;
    this.offsetBottom = 10;
    this.offsetLeft = 10;
    this.offsetRight = 10;
    this.isCollectible = true;
    this.animate();
  }

  /**
   * Initializes animation for this coin
   */
  animate() {
    setStoppableInterval(() => {
      if (isGameActive) {
        this.playAnimation(this.IMAGES_COIN);
      }
    }, 1000 / 10);
  }
}