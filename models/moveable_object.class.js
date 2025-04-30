class MoveableObject extends DrawableObject {
  speed = 0.15; 
  otherDirection = false;
  offsetX = 0;
  offsetY = 0;
  offsetTop = 0;
  offsetBottom = 0;
  offsetLeft = 0;
  offsetRight = 0;
  energy = 100;

  /**
   * Checks if this object is colliding with another moveable object
   * @param {MoveableObject} moveableObject - The object to check collision with
   * @returns {boolean} True if objects are colliding
   */
  isColliding(moveableObject) {
    const leftOffset = this.offsetLeft || this.offsetX;
    const rightOffset = this.offsetRight || this.offsetX;
    const topOffset = this.offsetTop || this.offsetY;
    const bottomOffset = this.offsetBottom || this.offsetY;
    return (this.x + this.width - rightOffset) >= moveableObject.x &&
            (this.x + leftOffset) <= (moveableObject.x + moveableObject.width) &&
            (this.y + this.height - bottomOffset) >= moveableObject.y &&
            (this.y + topOffset) <= (moveableObject.y + moveableObject.height);
  }

  /**
   * Applies damage to this object
   * @param {number} damage - The amount of damage to apply
   */
  hit(damage = 5) {
    this.playAnimation(this.IMAGES_HIT);
    this.energy -= damage;
    if (this.energy < 0) {
      this.energy = 0;
    }
  }

  /**
   * Checks if the object has no energy left
   * @returns {boolean} True if the object is dead (energy is 0)
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Starts the movement of this object
   */
  startMovement() {
    setStoppableInterval(() => {
        if (isGameActive && !this.isDying) {
            this.x -= this.speed;
        }
    }, 1000/60);
  }

  /**
   * Plays an animation by cycling through image frames
   * @param {string[]} images - Array of image paths to use for animation
   */
  playAnimation(images) {
    if (!isGameActive || !images || !Array.isArray(images)) return;    
    let index = this.currentImage % images.length; 
    let path = images[index];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}