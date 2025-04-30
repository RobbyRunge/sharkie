/**
 * Represents a game level with enemies and background objects
 */
class Level {
  enemies; 
  backgroundObject; 
  level_end_x = 2250;

  /**
   * Creates a new level with specified enemies and background objects
   * @param {Array} enemies - Array of enemy objects for this level
   * @param {Array} backgroundObject - Array of background objects for this level
   */
  constructor(enemies, backgroundObject) {
    this.enemies = enemies;
    this.backgroundObject = backgroundObject;
  }
}