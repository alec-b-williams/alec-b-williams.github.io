import GameDisplay from "./display.js";
import Player from "./player.js";
import { Map } from "../lib/index.js";

class Game {
  constructor() {
    this.screenDim = {
      width: 80,
      height: 40
    }
    this.gd = new GameDisplay(this);
    this.player = new Player(40, 20);
    this.map = new Map.Digger(this.screenDim.width, this.screenDim.height);

    this.gd.init();
  }

  run() {
    
  }
}

export default Game;