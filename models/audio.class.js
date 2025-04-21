class AudioManager {
  constructor() {
    this.sounds = {};
    this.backgroundMusic = null;
    this.isMuted = false;
  }

  loadSound(name, path) {
    this.sounds[name] = new Audio(path);
  }

  playSound(name) {
    if (this.isMuted) return;
    if (this.sounds[name]) {
        // Create a copy to allow overlapping sounds
        const sound = this.sounds[name].cloneNode();
        sound.play();
    }
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
        this.sounds[name].volume = volume; // 0.0 to 1.0
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
        if (this.backgroundMusic) this.backgroundMusic.pause();
    } else {
        if (this.backgroundMusic) this.backgroundMusic.play();
    }
    return this.isMuted;
  }

  stopAllSounds() {
    for (let sound in this.sounds) {
        this.sounds[sound].pause();
        this.sounds[sound].currentTime = 0;
    }
  }
}