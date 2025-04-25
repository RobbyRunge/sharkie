let level_1;

function initLevel() {
  level_1 = new Level(
  [
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),

    new Posion(),
    new Posion(),
    new Posion(),
    new Posion(),
    new Posion(),
    new Posion(),

    // new GreenFish(), 
    // new GreenFish(), 
    // new OrangeFish(),
    // new OrangeFish(),
    // new RedFish(),
    // new RedFish(),
    // new LilaJellyFish(),
    // new LilaJellyFish(),
    // new YellowJellyFish(),
    // new YellowJellyFish(),
    // new GreenJellyFish(), // strobg enemy
    // new GreenJellyFish(), // strobg enemy
    // new PinkJellyFish(), // strong enemy
    // new PinkJellyFish(), // strong enemy
    new Endboss(),
  ],
  [
    new BackgroundObject("./img/3.Background/Layers/5. Water/L2.png", -719),
    new BackgroundObject("./img/3.Background/Layers/4.Fondo 2/L2.png", -719),
    new BackgroundObject("./img/3.Background/Layers/3.Fondo 1/D2.png", -719),
    new BackgroundObject("./img/3.Background/Layers/2. Floor/L2.png", -719),
    new BackgroundObject("./img/3.Background/Layers/1. Light/2.png", -719),

    new BackgroundObject("./img/3.Background/Layers/5. Water/L1.png", 0),
    new BackgroundObject("./img/3.Background/Layers/4.Fondo 2/L1.png", 0),
    new BackgroundObject("./img/3.Background/Layers/3.Fondo 1/D1.png", 0),
    new BackgroundObject("./img/3.Background/Layers/2. Floor/L1.png", 0),
    new BackgroundObject("./img/3.Background/Layers/1. Light/1.png", 0),
    new BackgroundObject("./img/3.Background/Layers/5. Water/L2.png", 719),
    new BackgroundObject("./img/3.Background/Layers/4.Fondo 2/L2.png", 719),
    new BackgroundObject("./img/3.Background/Layers/3.Fondo 1/D2.png", 719),
    new BackgroundObject("./img/3.Background/Layers/2. Floor/L2.png", 719),
    new BackgroundObject("./img/3.Background/Layers/1. Light/2.png", 719),

    new BackgroundObject("./img/3.Background/Layers/5. Water/L1.png", 719 * 2),
    new BackgroundObject("./img/3.Background/Layers/4.Fondo 2/L1.png", 719 * 2),
    new BackgroundObject("./img/3.Background/Layers/3.Fondo 1/D1.png", 719 * 2),
    new BackgroundObject("./img/3.Background/Layers/2. Floor/L1.png", 719 * 2),
    new BackgroundObject("./img/3.Background/Layers/1. Light/1.png", 719 * 2),
    new BackgroundObject("./img/3.Background/Layers/5. Water/L2.png", 719 * 3),
    new BackgroundObject("./img/3.Background/Layers/4.Fondo 2/L2.png", 719 * 3),
    new BackgroundObject("./img/3.Background/Layers/3.Fondo 1/D2.png", 719 * 3),
    new BackgroundObject("./img/3.Background/Layers/2. Floor/L2.png", 719 * 3),
    new BackgroundObject("./img/3.Background/Layers/1. Light/2.png", 719 * 3),
  ]);
}