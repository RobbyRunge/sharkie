class DestructibleEnemy extends MoveableObject {
    isDying = false;
    currentDeadFrame = 0;
    deathAnimationComplete = false;
    
    die() {
        audioManager.playSound('die_enemie', false);
        audioManager.setVolume('die_enemie', 0.2);
        this.isDying = true;
        this.currentDeadFrame = 0;
        this.deathAnimationComplete = false;
    }
    
    playDeathAnimation() {
        if (this.currentDeadFrame < this.IMAGES_DEAD.length) {
            this.img = this.imageCache[this.IMAGES_DEAD[this.currentDeadFrame]];
            this.currentDeadFrame++;
        } else if (!this.deathAnimationComplete) {
            this.deathAnimationComplete = true;
        }
    }
}