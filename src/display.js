import { Display, FOV } from "../lib/index.js";
import { TileTypes, Point } from "./util.js";

class GameDisplay {
  constructor(game) {
    this.game = game;
    this.oldTiles = []
  }
  
  init() {
    let o = this.game.screenDim //get screen dimensions
    let d = new Display(o);     //initialize display, attach it to the doc
    this.d = d
    document.body.appendChild(d.getContainer());

    //initialize FOV
    this.fov = new FOV.PreciseShadowcasting((x,y) => {
      return this.game.getTileContents(x, y) == TileTypes.Floor
    });

    //draw the starting screen
    this.redraw()
  }
  
  redraw() {
    this.drawFov()      //redraw terrain in player's FOV
    this.drawEntities() //redraw entities within player's view
  }

  drawFov() {
    let p = this.game.player
    let visibleTiles = []     //list of currently visible tiles
                              //used to compare against list of previously visible tiles

    //draw terrain in FOV
    this.fov.compute(p.x, p.y, p.r, (x, y, r, visibility) => {
      this.d.draw(x, y, this.game.getTileChar(x, y), "#fff");
      visibleTiles.push(new Point(x,y))
    });

    //redraw terrain that is no longer visible as grey
    for (var i=0; i < this.oldTiles.length; i++) {
      let ot = this.oldTiles[i]
      if (!visibleTiles.some((newTile) => {
        return ot.x == newTile.x && ot.y == newTile.y
      })) {
        console.log("drawing old tile @ "+ot.x+","+ot.y)
        this.d.draw(ot.x, ot.y, this.game.getTileChar(ot.x, ot  .y), "#aaa");
      }
    }
    this.oldTiles = visibleTiles
  }

  drawEntities() {
    var entities = this.game.getEntitiesNearPlayer()

    for (var i = 0; i < entities.length; i++) {
      this.d.draw(entities[i].x, entities[i].y, entities[i].symbol, entities[i].color)
    }
  }
}

export default GameDisplay;