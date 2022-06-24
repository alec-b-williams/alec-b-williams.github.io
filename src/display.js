import { Display } from "../lib/index.js";

class GameDisplay {
  constructor(game) {
    this.game = game;
  }
  
  init() {
    let o = this.game.screenDim
    let d = new Display(o);
    this.d = d
    document.body.appendChild(d.getContainer());

    this.game.map.create(d.DEBUG)
    
    d.draw(this.game.player.x, this.game.player.y, "@", "goldenrod");
  }
  
}

export default GameDisplay;