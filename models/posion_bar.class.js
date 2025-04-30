class PosionBar extends DrawableObject {
  percentage = 100;

  IMAGES_POISON = [
    './img/4.Marcadores/green/poisoned bubbles/0.png',
    './img/4.Marcadores/green/poisoned bubbles/20.png',
    './img/4.Marcadores/green/poisoned bubbles/40.png',
    './img/4.Marcadores/green/poisoned bubbles/60.png',
    './img/4.Marcadores/green/poisoned bubbles/80.png',
    './img/4.Marcadores/green/poisoned bubbles/100.png',
  ];

  /**
   * Creates a new poison bar at specified position
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_POISON);
    this.x = 10;
    this.y = 100;
    this.width = 200;
    this.height = 60;
    this.setPercentage(0);
  }

  /**
   * Updates the poison bar display based on the percentage value
   * @param {number} percentage - Poison percentage value (0-100)
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_POISON[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }  
    
  /**
   * Determines which image to use based on current percentage
   * @returns {number} Index of the image to display
   */
  resolveImageIndex() {
    if (this.percentage >= 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
