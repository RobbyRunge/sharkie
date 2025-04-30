class DrawableObject {
  img; 
  imageCache = {}; 
  currentImage = 0; 
  x = 120; 
  y = 200; 
  height = 100; 
  width = 100; 

  /**
   * Loads a single image
   * @param {string} path - Path to the image file
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }
  
  /**
   * Loads multiple images into the image cache
   * @param {string[]} array - Array of image paths to load
   */
  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws the object on the canvas
   * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on
   * @param {number} x - The x position (defaults to this.x)
   * @param {number} y - The y position (defaults to this.y)
   */
  draw(ctx, x = this.x, y = this.y) {
    try {
      ctx.drawImage(this.img, x, y, this.width, this.height);
    } catch (error) {
      console.warn('Error loading image', e);
      console.log('Could not load Image', this.img.src);
    }
  }
}
