class AudioManager {
  constructor() {
    this.sounds = {};
    this.playingSounds = {};
    this.backgroundMusic = null;
    this.isMuted = false;
  }

  /**
   * Loads an audio file into the sounds collection
   * @param {string} name - The identifier for the sound
   * @param {string} path - The file path to the audio file
   */
  loadSound(name, path) {
    this.sounds[name] = new Audio(path);
  }

  /**
   * Plays a sound from the sounds collection
   * @param {string} name - The identifier for the sound to play
   * @param {boolean} allowOverlap - Whether to allow the same sound to overlap (default: true)
   */
  playSound(name, allowOverlap = true) {
    if (this.isMuted) return;
    if (this.sounds[name]) {
      if (allowOverlap) {
        const sound = this.sounds[name].cloneNode();
        sound.play();
      } else {
        this.stopSound(name);
        this.playingSounds[name] = this.sounds[name];
        this.sounds[name].play();
      }
    }
  }

  /**
   * Stops a specific sound that is playing
   * @param {string} name - The identifier for the sound to stop
   */
  stopSound(name) {
    if (this.sounds[name]) {
      this.sounds[name].pause();
      this.sounds[name].currentTime = 0;
    }
    if (this.playingSounds[name]) {
      this.playingSounds[name].pause();
      this.playingSounds[name].currentTime = 0;
      delete this.playingSounds[name];
    }
  }

  /**
   * Stops all sounds that are currently playing
   */
  stopAllSounds() {
    for (let sound in this.sounds) {
      this.sounds[sound].pause();
      this.sounds[sound].currentTime = 0;
    }
    for (let sound in this.playingSounds) {
      this.playingSounds[sound].pause();
      this.playingSounds[sound].currentTime = 0;
    }
    this.playingSounds = {};
  }

  /**
   * Plays a sound as background music
   * @param {string} name - The identifier for the sound to use as background music
   * @param {boolean} loop - Whether the music should loop (default: true)
   */
  playBackgroundMusic(name, loop = true) {
    if (this.backgroundMusic) {
      this.backgroundMusic.pause();
    }
    if (this.sounds[name]) {
      this.backgroundMusic = this.sounds[name];
      this.backgroundMusic.loop = loop;
      this.backgroundMusic.play();
    }
  }

  /**
   * Sets the volume level for a specific sound
   * @param {string} name - The identifier for the sound
   * @param {number} volume - The volume level (0.0 to 1.0)
   */
  setVolume(name, volume) {
    if (this.sounds[name]) {
      this.sounds[name].volume = volume;
    }
    if (this.playingSounds[name]) {
      this.playingSounds[name].volume = volume;
    }
  }

  /**
   * Toggles mute state for all sounds
   * @returns {boolean} The current mute state after toggling
   */
  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.backgroundMusic) {
      if (this.isMuted) {
        this.backgroundMusic.pause();
      } else {
        this.backgroundMusic.play();
      }
    }
    for (let sound in this.playingSounds) {
      if (this.isMuted) {
        this.playingSounds[sound].pause();
      } else {
        this.playingSounds[sound].play();
      }
    }
    return this.isMuted;
  }
}