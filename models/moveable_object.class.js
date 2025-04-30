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
    if (!isGameActive || !images || !Array.isArray(images)) return;    
    let index = this.currentImage % images.length; 
    let path = images[index];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}