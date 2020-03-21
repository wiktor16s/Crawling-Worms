import { getPlayersData, getSnake } from "./data";
import Snake from "./Snake";

export const canvas: HTMLCanvasElement = document.getElementById(
  "canvas"
) as HTMLCanvasElement;

export const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

export const draw = (): void => {
  getSnake().update();
  getSnake().checkIfOutOfWorld();

  ctx.fillStyle = "#594d41";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let player of getPlayersData()) {
    drawOther(player);
  }

  getSnake().show(ctx);
  getSnake().checkCollision(getPlayersData());
  getSnake().grow();
};



export const drawOther = (player: Snake) => {
    ctx.fillStyle = `rgb(${player.color.r} ${player.color.g} ${player.color.b})`;
    for (let i = 0; i < player.snakeTrail.length; i++) {
      ctx.fillRect(
        player.snakeTrail[i].x * player.tileSize,
        player.snakeTrail[i].y * player.tileSize,
        player.tileSize,
        player.tileSize
      );
      if (
        player.snakeTrail[i].x == player.snakeX &&
        player.snakeTrail[i].y == player.snakeY
      ) {
        player.tailSize = player.defaultTailSize;
      }
    }
  };