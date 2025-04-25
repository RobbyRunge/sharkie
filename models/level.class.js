class Level {
  enemies; 
  backgroundObject; 
  level_end_x = 2250;

  constructor(enemies, backgroundObject) {
    this.enemies = enemies;
    this.backgroundObject = backgroundObject;
  }
}