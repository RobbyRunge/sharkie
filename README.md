# <img src="https://img.icons8.com/color/24/000000/shark.png" style="vertical-align: middle;" height="24" width="24"/> Sharkie - Underwater Adventure Game

## <img src="https://img.icons8.com/color/24/000000/play.png" style="vertical-align: middle;" height="24" width="24"/> About

Sharkie is a 2D underwater adventure game developed using HTML5, CSS3, and JavaScript. Players control a shark navigating through dangerous waters, collecting coins and poison bottles while battling various sea creatures including a challenging endboss. The game features engaging animations, sound effects, and responsive gameplay mechanics.

## <img src="https://cdn-icons-png.flaticon.com/512/1541/1541425.png" style="vertical-align: middle;" height="24" width="24"/> Features

- **Underwater Adventure Gameplay** - Navigate through a beautiful underwater world
- **Character Controls** - Smooth movement with swimming, slapping, and shooting mechanics
- **Enemy Encounters** - Fight various sea creatures including fish and jellyfish
- **Epic Endboss Battle** - Face off against a challenging final enemy
- **Collectible System** - Gather coins and poison bottles to enhance gameplay
- **Status Bars** - Track health, coins, and poison bottle inventory
- **Sound Effects** - Immersive audio experience with background music and sound effects
- **Responsive Design** - Optimized for different screen sizes with orientation detection
- **Object-Oriented Programming** - Clean, modular code structure using JavaScript classes
- **Animation System** - Smooth sprite-based animations for all game objects

## <img src="https://cdn-icons-png.flaticon.com/512/10015/10015092.png" style="vertical-align: middle;" height="24" width="24"/> How to Play

1. **Movement**: Use arrow keys to navigate Sharkie through the water
2. **Attack**: Press SPACE to perform a fin slap attack on nearby enemies
3. **Shoot**: Press D to shoot poison bottles at distant enemies
4. **Collect Items**: Swim into coins and poison bottles to collect them
5. **Health Management**: Avoid enemy attacks to maintain your health
6. **Win Condition**: Defeat all enemies including the final endboss to win the game

### Controls
- **Arrow Keys**: Move Sharkie in all directions
- **SPACE**: Fin slap attack
- **D**: Shoot poison bottle
- **F**: Toggle fullscreen mode
- **Sound Icon**: Toggle sound on/off

## <img src="https://img.icons8.com/color/24/000000/code.png" style="vertical-align: middle;" height="24" width="24"/> Technologies

- **HTML5** - Game structure and canvas element
- **CSS3** - Styling and animations
- **JavaScript (ES6+)** - Game logic and object-oriented programming
- **Canvas API** - 2D graphics rendering
- **Web Audio API** - Sound management and audio effects
- **Local Storage** - Game state persistence

## <img src="https://img.icons8.com/color/24/000000/folder-invoices.png" style="vertical-align: middle;" height="24" width="24"/> Structure of the Project

```
sharkie/
├── audio/ # Sound effects and background music
│ ├── background_sound.mp3
│ ├── bubble_shoot_sound.mp3
│ ├── collect_coin.mp3
│ ├── fin_slap_sound.mp3
│ └── ... (other audio files)
|
├── fonts/ # Custom fonts
│ └── Super_Water.ttf
|
├── img/ # Game graphics and sprites
│ ├── 1.Sharkie/ # Main character sprites
│ │ ├── 1.IDLE/ # Idle animation frames
│ │ ├── 2.Long_IDLE/ # Long idle animation
│ │ ├── 3.Swim/ # Swimming animation
│ │ ├── 4.Attack/ # Attack animations
│ │ └── 5.Hurt/ # Hurt animation
│ ├── 2.Enemy/ # Enemy sprites
│ │ ├── 1.Puffer_fish/ # Puffer fish variations
│ │ ├── 2.Jelly_fish/ # Jellyfish types
│ │ └── 3.Final_Enemy/ # Endboss sprites
│ ├── 3.Background/ # Background layers
│ │ └── Layers/ # Parallax background layers
│ ├── 4.Marcadores/ # UI elements and collectibles
│ │ ├── 1. Coins/ # Coin animation frames
│ │ ├── green/ # Health and status bars
│ │ └── purple/ # Poison bottle bars
│ └── assets/ # UI icons and assets
|
├── js/ # Main JavaScript files
│ ├── game.js # Game initialization and main loop
│ ├── menu.js # Menu system and overlays
│ └── template.js # HTML templates for game screens
|
├── levels/ # Level configuration
│ └── level_1.js # First level setup with enemies and background
|
├── models/ # Game object classes
│ ├── animation_assets.class.js # Animation management
│ ├── audio.class.js # Audio system management
│ ├── background_object.class.js # Background rendering
│ ├── character.class.js # Main player character
│ ├── character_animation.class.js # Character animations
│ ├── coin.class.js # Collectible coins
│ ├── coin_bar.class.js # Coin counter UI
│ ├── collision_handler.class.js # Collision detection
│ ├── destructible_enemy.class.js # Base enemy class
│ ├── drawable_object.class.js # Base drawable object
│ ├── endboss.class.js # Final boss enemy
│ ├── game_renderer.class.js # Game rendering system
│ ├── green_fish.class.js # Green fish enemy
│ ├── hit_animation_handler.class.js # Hit effect animations
│ ├── keyboard.class.js # Input handling
│ ├── level.class.js # Level structure
│ ├── lila_jelly_fish.class.js # Purple jellyfish
│ ├── moveable_object.class.js # Base moveable object
│ ├── orange_fish.class.js # Orange fish enemy
│ ├── pink_jelly_fish.class.js # Pink jellyfish
│ ├── posion.class.js # Poison bottle collectible
│ ├── posion_bar.class.js # Poison bottle counter
│ ├── red_fish.class.js # Red fish enemy
│ ├── shooting_animation_handler.class.js # Shooting animations
│ ├── sleep_animation_handler.class.js # Idle animations
│ ├── status_bar.class.js # Health bar UI
│ ├── throwable_object.class.js # Projectile system
│ ├── world.class.js # Game world management
│ └── yellow_jelly_fish.class.js # Yellow jellyfish
|
├── out/ # JSDoc generated documentation
│ ├── index.html # Documentation homepage
│ └── ... (other documentation files)
|
├── index.html # Main game file
├── style.css # Main stylesheet
└── README.md # Project documentation
```

## <img src="https://img.icons8.com/color/24/000000/conference-call.png" style="vertical-align: middle;" height="24" width="24"/> Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/RobbyRunge/sharkie.git
   ```

2. Navigate to the project directory:
   ```bash
   cd sharkie
   ```

3. Open `index.html` in your web browser to start playing the game

   **Note**: For best performance, use a modern web browser with JavaScript enabled.

## <img src="https://img.icons8.com/color/24/000000/gear.png" style="vertical-align: middle;" height="24" width="24"/> Game Architecture

The game is built using object-oriented programming principles with the following key components:

- **World Class**: Manages the game state, camera, and coordinates all game objects
- **Character Class**: Handles player movement, animations, and interactions
- **Enemy Classes**: Various enemy types with unique behaviors and animations
- **Collision Handler**: Manages all collision detection between game objects
- **Game Renderer**: Handles drawing and animation of all visual elements
- **Audio Manager**: Controls sound effects and background music
- **Level System**: Manages enemy spawning and background generation

## <img src="https://cdn-icons-png.flaticon.com/512/18243/18243124.png" style="vertical-align: middle;" height="24" width="24"/> Author

**Robby Runge**
- GitHub: [@RobbyRunge](https://github.com/RobbyRunge)
- Project Repository: [Sharkie Game](https://github.com/RobbyRunge/sharkie)

---

*Sharkie - Dive into adventure! 🦈*
