class GameKeyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;
  D = false;
  E = false; 

  constructor() {
    this.bindKeyPressEvents();
    this.bindButtonsPressEvents();
  }

  bindKeyPressEvents() {
    document.getElementById('game_container').addEventListener('touchmove', (e) => {
      e.preventDefault();
    }, { passive: false });

    document.getElementById('arrow_left').addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.LEFT = true;
    }, { passive: false });

    document.getElementById('arrow_left').addEventListener('touchend', (e) => {
      e.preventDefault();
      this.LEFT = false;
    }, { passive: false });

    document.getElementById('arrow_up').addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.UP = true;
    }, { passive: false });

    document.getElementById('arrow_up').addEventListener('touchend', (e) => {
      e.preventDefault();
      this.UP = false;
    }, { passive: false });

    document.getElementById('arrow_down').addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.DOWN = true;
    }, { passive: false });

    document.getElementById('arrow_down').addEventListener('touchend', (e) => {
      e.preventDefault();
      this.DOWN = false;
    }, { passive: false });

    document.getElementById('arrow_right').addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.RIGHT = true;
    }, { passive: false });

    document.getElementById('arrow_right').addEventListener('touchend', (e) => {
      e.preventDefault();
      this.RIGHT = false;
    }, { passive: false });

    document.getElementById('speed_boost').addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.E = true;
    }, { passive: false });

    document.getElementById('speed_boost').addEventListener('touchend', (e) => {
      e.preventDefault();
      this.E = false;
    }, { passive: false });

    document.getElementById('throw_bottle').addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.D = true;
    }, { passive: false });

    document.getElementById('throw_bottle').addEventListener('touchend', (e) => {
      e.preventDefault();
      this.D = false;
    }, { passive: false });

    document.getElementById('fin_slap').addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.SPACE = true;
    }, { passive: false });

    document.getElementById('fin_slap').addEventListener('touchend', (e) => {
      e.preventDefault();
      this.SPACE = false;
    }, { passive: false });
  }

  bindButtonsPressEvents() {
    window.addEventListener('keyup', (e) => {
      if (e.key === 'ArrowLeft') this.LEFT = false;
      if (e.key === 'ArrowUp') this.UP = false;
      if (e.key === 'ArrowDown') this.DOWN = false;
      if (e.key === 'ArrowRight') this.RIGHT = false;
      if (e.key === ' ') this.SPACE = false;
      if (e.key === 'd') this.D = false;
      if (e.key === 'e') this.E = false; 
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.LEFT = true;
      if (e.key === 'ArrowUp') this.UP = true;
      if (e.key === 'ArrowDown') this.DOWN = true;
      if (e.key === 'ArrowRight') this.RIGHT = true;
      if (e.key === ' ') this.SPACE = true;
      if (e.key === 'd') this.D = true;
      if (e.key === 'e') this.E = true; 
    });
  }
}
