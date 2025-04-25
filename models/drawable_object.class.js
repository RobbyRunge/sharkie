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

  drawFrame(ctx, x = this.x, y = this.y) {
    if (this instanceof Character || this instanceof GreenFish || this instanceof OrangeFish || this instanceof RedFish || this instanceof LilaJellyFish || this instanceof YellowJellyFish || this instanceof GreenJellyFish || this instanceof PinkJellyFish || this instanceof Endboss) {
      const leftOffset = this.offsetLeft || this.offsetX;
      const rightOffset = this.offsetRight || this.offsetX;
      const topOffset = this.offsetTop || this.offsetY;
      const bottomOffset = this.offsetBottom || this.offsetY;
      ctx.beginPath();
      ctx.lineWidth = "0.5";
      ctx.strokeStyle = "red";
      ctx.rect(
        x + leftOffset,
        y + topOffset,
        this.width - leftOffset - rightOffset,
        this.height - topOffset - bottomOffset
      );
      ctx.stroke();
    }
  }
}
