class ThrowableObject extends MoveableObject {
  speedX = 20;

  /**
   * Creates a throwable object at the specified coordinates
   * @param {number} x - X position to create the object at
   * @param {number} y - Y position to create the object at
   */
  constructor(x, y) {
    super().loadImage('./img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png')
    this.x = x + 60;
    this.y = y;
    this.height = 40;
    this.width = 40;
    this.throw();
  }

  /**
   * Moves the object in the x direction
   */
  throw() {
    setStoppableInterval(() => {
      if (isGameActive) {
        this.x += 10;
      }
    }, 35);
  };
}