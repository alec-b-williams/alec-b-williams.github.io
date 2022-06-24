import GameDisplay from "./display.js";
import Player from "./player.js";

class Game {
  constructor() {
    this.gd = new GameDisplay(80, 40, this);
    this.player = new Player(40, 20);

    this.gd.init();
  }
}

export default Game;