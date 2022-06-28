import Game from "./game.js";
import { TileTypes } from "./util.js";

class Player {
  constructor(x, y, game) {
    this.game = game
    this.x = x;
    this.y = y;
    //this.oldX = x;  //previous player location, used for drawing
    //this.oldY = y;
    this.health = 10;
    this.r = 10;  //FoV distance
    this.symbol = '@'
    this.color = "goldenrod"
  }

  move(key) {
    var newX = this.x
    var newY = this.y

    switch(key) {
      case (37): //left
        newX -= 1
        break
      case (38): //up
        newY -= 1
        break
      case (39): //right
        newX += 1
        break
      case (40): //down
        newY += 1
        break
    }

    if (this.game.getTileContents(newX, newY) != TileTypes.Wall) {
      //this.oldX = this.x;
      //this.oldY = this.y;
      this.x = newX;
      this.y = newY;
    }
  }
}

export default Player;