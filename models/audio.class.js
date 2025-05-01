class AudioManager {
  constructor() {
    this.sounds = {};
    this.playingSounds = {};
    this.audioPromises = {};  // Add this to track promises
    this.backgroundMusic = null;
    this.currentBackgroundTrack = this.loadBackgroundTrackFromStorage();
    this.isMuted = this.loadMuteStateFromStorage();
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
   * @returns {Promise} A promise that resolves when the sound starts playing
   */
  playSound(name, allowOverlap = true) {
    if (this.isMuted) return Promise.resolve();
    if (this.sounds[name]) {
      if (allowOverlap) {
        const sound = this.sounds[name].cloneNode();
        const playPromise = sound.play();    
        if (playPromise !== undefined) {
          return playPromise.catch(error => {
          });
        }
        return Promise.resolve();
      } else {
        return this.stopSound(name).then(() => {
          this.playingSounds[name] = this.sounds[name];
          const playPromise = this.sounds[name].play();
          
          if (playPromise !== undefined) {
            this.audioPromises[name] = playPromise;
            return playPromise.catch(error => {
              delete this.audioPromises[name];
            });
          }
          return Promise.resolve();
        });
      }
    }
    return Promise.resolve();
  }

  /**
   * Stops a specific sound that is playing
   * @param {string} name - The identifier for the sound to stop
   * @returns {Promise} A promise that resolves when it's safe to manipulate the audio
   */
  stopSound(name) {
    if (this.sounds[name]) {
      const sound = this.sounds[name];
      sound.pause();
      sound.currentTime = 0;
      const soundElements = document.querySelectorAll(`audio[data-sound="${name}"]`);
      soundElements.forEach(element => {
        element.pause();
        element.currentTime = 0;
      });
      return Promise.resolve();
    }
    return Promise.resolve();
  }

  /**
   * Stops all sounds that are currently playing
   */
  stopAllSounds() {
    const promises = [];
    for (let sound in this.sounds) {
      promises.push(this.stopSound(sound));
    }
    for (let sound in this.playingSounds) {
      promises.push(this.stopSound(sound));
    }
    this.playingSounds = {};
    return Promise.all(promises);
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
      if (!this.isMuted) {
        this.backgroundMusic.play();
      }
      // Save current background track to localStorage
      this.currentBackgroundTrack = name;
      this.saveBackgroundTrackToStorage();
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
   * Loads the mute state from localStorage
   * @returns {boolean} The saved mute state or false if not found
   * @private
   */
  loadMuteStateFromStorage() {
    const savedMuteState = localStorage.getItem('sharkie_muted');
    return savedMuteState === 'true';
  }

  /**
   * Loads the background track name from localStorage
   * @returns {string|null} The saved background track name or null if not found
   * @private
   */
  loadBackgroundTrackFromStorage() {
    return localStorage.getItem('sharkie_background_track');
  }

  /**
   * Saves the current mute state to localStorage
   * @private
   */
  saveMuteStateToStorage() {
    localStorage.setItem('sharkie_muted', this.isMuted);
  }

  /**
   * Saves the current background track name to localStorage
   * @private
   */
  saveBackgroundTrackToStorage() {
    if (this.currentBackgroundTrack) {
      localStorage.setItem('sharkie_background_track', this.currentBackgroundTrack);
    }
  }

  /**
   * Toggles mute state for all sounds and saves to localStorage
   * @returns {boolean} The current mute state after toggling
   */
  toggleMute() {
    this.isMuted = !this.isMuted;
    this.updateBackgroundMusicState();
    this.updatePlayingSoundsState();
    this.saveMuteStateToStorage();
    return this.isMuted;
  }

  /**
   * Updates background music based on current mute state
   * @private
   */
  updateBackgroundMusicState() {
    if (this.backgroundMusic) {
      if (this.isMuted) {
        this.backgroundMusic.pause();
      } else {
        this.backgroundMusic.play();
      }
    }
  }

  /**
   * Updates all currently playing sounds based on current mute state
   * @private
   */
  updatePlayingSoundsState() {
    for (let sound in this.playingSounds) {
      if (this.isMuted) {
        this.playingSounds[sound].pause();
      } else {
        this.playingSounds[sound].play();
      }
    }
  }

  /**
   * Resumes background music from saved state
   * Should be called after loading sounds
   */
  resumeBackgroundMusic() {
    if (this.currentBackgroundTrack && this.sounds[this.currentBackgroundTrack]) {
      this.setVolume(this.currentBackgroundTrack, 0.3);
      this.playBackgroundMusic(this.currentBackgroundTrack);
    }
  }
}