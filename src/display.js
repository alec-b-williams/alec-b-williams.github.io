import { Display } from "../lib/index.js";

class GameDisplay {
  constructor(w, h, game) {
    this.o = {
      width: w,
      height: h
    }
    this.game = game;
  }
  
  init() {
    let o = this.o
    let d = new Display(o);
    this.d = d
    document.body.appendChild(d.getContainer());

    for (let i=0; i<o.width; i++) {
      for (let j=0; j<o.height; j++) {
        if (!i || !j || i+1 == o.width || j+1 == o.height) {
          d.draw(i, j, "#", "gray");
        } else {
          d.draw(i, j, ".", "#666");
        }
      }
    }
    
    d.draw(this.game.player.x, this.game.player.y, "@", "goldenrod");
  }
  
}

export default GameDisplay;