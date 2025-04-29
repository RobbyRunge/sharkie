class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;
  D = false;
  E = false; 

  constructor() {
    window.addEventListener('keydown', (event) => {  
      switch(event.code) {
        case 'ArrowLeft':
          this.LEFT = true;
          break;
        case 'ArrowRight':
          this.RIGHT = true;
          break;
        case 'ArrowUp':
          this.UP = true;
          break;
        case 'ArrowDown':
          this.DOWN = true;
          break;
        case 'Space':
          this.SPACE = true;
          break;
        case 'KeyD':
          this.D = true;
          break;
        case 'KeyE':
          this.E = true;
          break;
      }
    }); 

    window.addEventListener('keyup', (event) => {
      switch(event.code) {
        case 'ArrowLeft':
          this.LEFT = false;
          break;
        case 'ArrowRight':
          this.RIGHT = false;
          break;
        case 'ArrowUp':
          this.UP = false;
          break;
        case 'ArrowDown':
          this.DOWN = false;
          break;
        case 'Space':
          this.SPACE = false;
          break;
        case 'KeyD':
          this.D = false;
          break;
        case 'KeyE':
          this.E = false;
          break;
      }
    });
  }
}