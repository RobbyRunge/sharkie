class AudioManager {
  constructor() {
    this.sounds = {};
    this.playingSounds = {};
    this.backgroundMusic = null;
    this.isMuted = false;
  }

  loadSound(name, path) {
    this.sounds[name] = new Audio(path);
  }

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

  setVolume(name, volume) {
    if (this.sounds[name]) {
      this.sounds[name].volume = volume;
    }
    if (this.playingSounds[name]) {
      this.playingSounds[name].volume = volume;
    }
  }

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