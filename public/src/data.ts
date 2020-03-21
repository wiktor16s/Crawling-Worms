import Snake from "./Snake";

export let snake: Snake;
export let playersData: Array<Snake> = [];

export const setSnake = (newSnake: Snake): Snake => {
  snake = newSnake;
  return snake;
};

export const getSnake = (): Snake => {
  return snake;
};

export const getPlayersData = (): Array<Snake> => {
  return playersData;
};

export const setPlayersData = (newPlayersData: Array<Snake>): Array<Snake> => {
  playersData = newPlayersData;
  return playersData;
};
