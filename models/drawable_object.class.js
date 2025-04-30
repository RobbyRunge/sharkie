class DrawableObject {
  img; 
  imageCache = {}; 
  currentImage = 0; 
  x = 120; 
  y = 200; 
  height = 100; 
  width = 100; 

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }
  
  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  draw(ctx, x = this.x, y = this.y) {
    try {
      ctx.drawImage(this.img, x, y, this.width, this.height);
    } catch (error) {
      console.warn('Error loading image', e);
      console.log('Could not load Image', this.img.src);
    }
  }
}
