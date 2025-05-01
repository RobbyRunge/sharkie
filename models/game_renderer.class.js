class GameRenderer {
  constructor(world) {
    this.world = world;
  }

  /**
   * Main draw loop that renders the entire game scene
   * Uses requestAnimationFrame for smooth animation
   */
  draw() {
    if (!isGameActive) return;
    
    this.world.ctx.clearRect(0, 0, this.world.canvas.width, this.world.canvas.height);
    this.world.ctx.translate(this.world.camera_x, 0);
    
    this.addObjectsToMap(this.world.level.backgroundObject);
    this.addObjectsToMap(this.world.throwableObject); 
    this.addObjectsToMap(this.world.level.enemies);
    this.addToMap(this.world.character);
    
    this.world.ctx.translate(-this.world.camera_x, 0);
    
    // Draw UI elements (fixed position on screen)
    this.addToMap(this.world.statusBar);
    this.addToMap(this.world.coinBar);
    this.addToMap(this.world.posionBar);
    
    this.world.ctx.translate(this.world.camera_x, 0);
    this.world.ctx.translate(-this.world.camera_x, 0);
    
    if (isGameActive) {
      requestAnimationFrame(() => this.draw());
    }
  }

  /**
   * Adds multiple objects to the game canvas
   * @param {Array<MoveableObject>} objects - The array of objects to render
   */
  addObjectsToMap(objects) {
    objects.forEach(o => {
      this.addToMap(o);
    });
  }

  /**
   * Adds a single object to the game canvas with appropriate transformations
   * @param {MoveableObject} moveableObject - The object to render
   */
  addToMap(moveableObject) {
    this.world.ctx.save();    
    if (moveableObject instanceof Character) {
      this.drawRotatedObject(moveableObject);
    } else {
      this.drawObject(moveableObject);
    }
    this.world.ctx.restore();
  }

  /**
   * Draws an object that might be rotated (like the character)
   * @param {MoveableObject} moveableObject - The object to render with rotation
   */
  drawRotatedObject(moveableObject) {
    this.moveToObjectCenter(moveableObject);
    this.applyDirectionAndRotation(moveableObject);
    this.moveToObjectTopLeft(moveableObject);
    this.drawObjectAtOrigin(moveableObject);
  }

  /**
   * Moves the canvas context to the center of an object
   * @param {MoveableObject} moveableObject - The target object
   */
  moveToObjectCenter(moveableObject) {
    this.world.ctx.translate(
      moveableObject.x + moveableObject.width/2, 
      moveableObject.y + moveableObject.height/2
    );
  }

  /**
   * Applies flipping and rotation transformations
   * @param {MoveableObject} moveableObject - The target object
   */
  applyDirectionAndRotation(moveableObject) {
    if (moveableObject.otherDirection) {
      this.world.ctx.scale(-1, 1);
    }
    this.world.ctx.rotate(moveableObject.rotation * Math.PI / 180);
  }

  /**
   * Moves the canvas context back to the top-left corner of an object
   * @param {MoveableObject} moveableObject - The target object
   */
  moveToObjectTopLeft(moveableObject) {
    this.world.ctx.translate(
      -(moveableObject.width/2), 
      -(moveableObject.height/2)
    );
  }

  /**
   * Draws the object at the current origin (0,0)
   * @param {MoveableObject} moveableObject - The object to render
   */
  drawObjectAtOrigin(moveableObject) {
    moveableObject.draw(this.world.ctx, 0, 0);
  }

  /**
   * Draws a regular (non-rotated) object
   * @param {MoveableObject} moveableObject - The object to render
   */
  drawObject(moveableObject) {
    if (moveableObject.otherDirection) {
      this.flipImageHorizontally(moveableObject);
    }
    this.drawAndFrameObject(moveableObject);
    if (moveableObject.otherDirection) {
      this.restoreOriginalDirection(moveableObject);
    }
  }

  /**
   * Flips an image horizontally for objects facing left
   * @param {MoveableObject} moveableObject - The object to flip
   */
  flipImageHorizontally(moveableObject) {
    this.world.ctx.save();
    this.world.ctx.translate(moveableObject.width, 0);
    this.world.ctx.scale(-1, 1);
    moveableObject.x = moveableObject.x * -1;
  }

  /**
   * Draws the object and its optional frame/border
   * @param {MoveableObject} moveableObject - The object to render
   */
  drawAndFrameObject(moveableObject) {
    moveableObject.draw(this.world.ctx);
  }

  /**
   * Restores the original direction after drawing a flipped object
   * @param {MoveableObject} moveableObject - The flipped object
   */
  restoreOriginalDirection(moveableObject) {
    moveableObject.x = moveableObject.x * -1;
    this.world.ctx.restore();
  }
}