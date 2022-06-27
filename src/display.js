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

    //this.game.map.create(d.DEBUG)
    let data = this.game.mapData
    for (let i = 0; i < this.game.screenDim.width; i++) {
      for (let j = 0; j < this.game.screenDim.height; j++) {
        if (data[i+","+j])
          this.d.draw(i, j, "#")
        else 
          this.d.draw(i,j,".")
      }
    }

    this.redrawEntities()
  }
  
  redrawEntities() {
    this.d.draw(this.game.player.oldX, this.game.player.oldY, ".");
    this.d.draw(this.game.player.x, this.game.player.y, "@", "goldenrod");
  }
}

export default GameDisplay;