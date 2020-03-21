import { Color, SnakeTrailCoord } from "./types";

class Snake {
  id: String;
  color: Color;
  defaultTailSize: number;
  tailSize: number;
  snakeTrail: Array<SnakeTrailCoord>;
  snakeX: number;
  snakeY: number;
  tileSize: number;
  gridSize: number;
  nextX: number;
  nextY: number;

  constructor(id: String, color: Color) {
    this.id = id;
    this.color = color;
    this.defaultTailSize = 1;
    this.tailSize = this.defaultTailSize;
    this.snakeTrail = [];
    this.snakeX = Math.floor(Math.random() * 750) + 50;
    this.snakeY = Math.floor(Math.random() * 550) + 50;
    this.tileSize = 10;
    this.gridSize = 60;
    this.nextX = 1;
    this.nextY = 0;
  }

  initControl() {
    const self = this;
    document.addEventListener("keydown", keyDownEvent);

    function keyDownEvent(e: KeyboardEvent) {
      console.log(self.nextX, self.nextY);
      switch (e.keyCode) {
        case 37: // left
          if (self.nextX != 1) {
            self.setDir(-1, 0);
          } else {
          }
          break;
        case 38: //up
          if (self.nextY != 1) {
            self.setDir(0, -1);
          }
          break;
        case 39: //right
          if (self.nextX != -1) {
            self.setDir(1, 0);
          }
          break;
        case 40: //down
          if (self.nextY != -1) {
            self.setDir(0, 1);
          }
          break;
      }
    }
  }

  setDir(x: number, y: number) {
    this.nextX = x;
    this.nextY = y;
  }

  update() {
    this.snakeX = this.snakeX + this.nextX;
    this.snakeY = this.snakeY + this.nextY;
  }

  checkIfOutOfWorld() {
    if (this.snakeX < 0) {
      this.snakeX = this.gridSize - 1;
    }
    if (this.snakeX > this.gridSize - 1) {
      this.snakeX = 0;
    }

    if (this.snakeY < 0) {
      this.snakeY = this.gridSize - 1;
    }
    if (this.snakeY > this.gridSize - 1) {
      this.snakeY = 0;
    }
  }

  show(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = `rgb(${this.color.r} ${this.color.g} ${this.color.b})`;
    for (let i = 0; i < this.snakeTrail.length; i++) {
      ctx.fillRect(
        this.snakeTrail[i].x * this.tileSize,
        this.snakeTrail[i].y * this.tileSize,
        this.tileSize,
        this.tileSize
      );
    }
  }

  checkCollision(playersData: Array<Snake>) {
    for (let otherSnake of playersData) {
      for (let segment of otherSnake.snakeTrail) {
        if (segment.x == this.snakeX && segment.y == this.snakeY) {
          this.tailSize = this.defaultTailSize;
        }
      }
    }

    for (let segment of this.snakeTrail) {
      if (segment.x == this.snakeX && segment.y == this.snakeY) {
        this.tailSize = this.defaultTailSize;
      }
    }
  }

  grow() {
    this.snakeTrail.push({ x: this.snakeX, y: this.snakeY });
    while (this.snakeTrail.length > this.tailSize) {
      this.snakeTrail.shift();
    }
    this.tailSize++;
  }
}

export default Snake;
