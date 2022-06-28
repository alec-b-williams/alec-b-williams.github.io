import { Display, FOV } from "../lib/index.js";
import { TileTypes } from "./util.js";

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
    /*let data = this.game.terrainData
    for (let i = 0; i < this.game.screenDim.width; i++) {
      for (let j = 0; j < this.game.screenDim.height; j++) {
        if (data[i+","+j])
          this.d.draw(i, j, "#")
        else 
          this.d.draw(i,j,".")
      }
    }*/

    this.fov = new FOV.PreciseShadowcasting((x,y) => {
      return this.game.getTileContents(x, y) == TileTypes.Floor
    });

    this.redraw()
  }
  
  redraw() {
    this.drawFov()
    this.drawEntities()
  }

  drawFov() {
    //let data = this.game.terrainData
    let p = this.game.player

    this.fov.compute(p.x, p.y, p.r, (x, y, r, visibility) => {
      this.d.draw(x, y, this.game.getTileChar(x, y), "#fff");
    });

    //this.d.draw(this.game.player.oldX, this.game.player.oldY, ".");
    //this.d.draw(this.game.player.x, this.game.player.y, "@", "goldenrod");
  }

  drawEntities() {
    var entities = this.game.getEntitiesNearPlayer()
    /*console.log(entities)
    for (var e in entities) {
      console.log(e.x +"," + e.y)
      this.d.draw(e.x, e.y, e.symbol, e.color)
    }*/
    for (var i = 0; i < entities.length; i++) {
      this.d.draw(entities[i].x, entities[i].y, entities[i].symbol, entities[i].color)
    }
      
  }
}

export default GameDisplay;