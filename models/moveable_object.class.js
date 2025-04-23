class MoveableObject extends DrawableObject {
  // Base class for all movable game entities
  speed = 0.15; // Default movement speed
  otherDirection = false; // Direction flag for flipping images
  // Replace symmetric offsets with directional offsets
  offsetX = 0;
  offsetY = 0;
  offsetTop = 0;
  offsetBottom = 0;
  offsetLeft = 0;
  offsetRight = 0;
  energy = 100;

  // Detects collision between two moveable objects using their offset boundaries
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

  hit(damage = 5) {
    this.playAnimation(this.IMAGES_HIT);
    this.energy -= damage;
    if (this.energy < 0) {
      this.energy = 0;
    }
  }

  isDead() {
    return this.energy == 0;
  }

  startMovement() {
    setStoppableInterval(() => {
        if (isGameActive && !this.isDying) {
            this.x -= this.speed;
        }
    }, 1000/60);
  }

  playAnimation(images) {
    // Only animate if game is active and images array exists
    if (!isGameActive || !images || !Array.isArray(images)) return;    
    // Play any animation sequence
    let index = this.currentImage % images.length; 
    let path = images[index];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}