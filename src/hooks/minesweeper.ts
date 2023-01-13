import { atom, useAtom } from "jotai";
import { Minesweeper } from "@/minesweeper";

const width = 30;
const height = 16;
const mines = 30;

const minesweeperAtom = atom(new Minesweeper(width, height, mines));

export const useMinesweeper = () => {
  const [minesweeper, setMinesweeper] = useAtom(minesweeperAtom);

  const reset = () => {
    minesweeper.clearTimer();
    const newMinesweeper = new Minesweeper(width, height, mines);
    setMinesweeper(newMinesweeper);
  };

  return {
    minesweeper,
    setMinesweeper,
    reset,
  };
};
