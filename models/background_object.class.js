/**
 * Class representing a background object in the game.
 * @extends MoveableObject
 */
class BackgroundObject extends MoveableObject {
  width = 720; 
  height = 480; 
  
  /**
   * Creates a new background object.
   * @param {string} imagePath - Path to the image used for the background object.
   * @param {number} x - The x-coordinate position of the background object.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}