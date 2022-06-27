import GameDisplay from "./display.js";
import Player from "./player.js";
import { Map } from "../lib/index.js";
import {TileTypes} from "./types.js";

class Game {
  constructor() {
    this.screenDim = {
      width: 80,
      height: 40
    }
    this.gd = new GameDisplay(this);
    this.player = new Player(40, 20, this);
    this.map = new Map.Digger(this.screenDim.width, this.screenDim.height);
    let mapData = []
    this.map.create(function(x, y, wall) {
      mapData[x+","+y] = (wall ? 1 : 0)
    })

    this.mapData = mapData;
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
      this.gd.redrawEntities()
    }
  }

  getTileContents(x, y) {
    return this.mapData[x+","+y]
  }
}

export default Game;