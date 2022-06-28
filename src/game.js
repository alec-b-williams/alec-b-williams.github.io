import GameDisplay from "./display.js";
import Player from "./player.js";
import { Map } from "../lib/index.js";
import { TileTypes as TT, distance } from "./util.js"

class Game {
  constructor() {
    this.screenDim = {
      width: 80,
      height: 40
    }
    this.gd = new GameDisplay(this);
    this.player = new Player(40, 20, this);
    this.map = new Map.Digger(this.screenDim.width, this.screenDim.height);
    let terrainData = []
    this.map.create(function(x, y, wall) {
      terrainData[x+","+y] = (wall ? 1 : 0)
    })

    let entityData = []
    entityData[this.player.x+","+this.player.y] = this.player
    this.entityData = entityData

    this.terrainData = terrainData;
    this.gd.init();

    window.addEventListener("keydown", (e) => {
      this.handleInput(e)
    })
  }

  handleInput(event) {
    //console.log(event.keyCode)
    let k = event.keyCode
    if (k >= 37 && k <= 40) {
      console.log("moving player w/ code " + k)
      this.player.move(k)
      this.gd.redraw()
    }
  }

  getTileChar(x, y) {
    let tile = this.getTileContents(x, y)
    switch (tile) {
      case (TT.Wall):
        return '#';
      case (TT.Floor):
        return '.'
    }
  }

  getTileContents(x, y) {
    return this.terrainData[x+","+y]
  }

  getEntitiesNearPlayer() {
    let entities = []
    for (let e in this.entityData) {
      if (distance(this.player, e) <= 10)
        entities.push(e)
    }
    entities.push(this.player)
    return entities
  }
}

export default Game;