import { atom, useAtom } from "jotai";
import { Minesweeper } from "@/minesweeper";

const width = 30;
const height = 16;
const mines = 60;

const minesweeperAtom = atom(new Minesweeper(width, height, mines));

export const useMinesweeper = () => {
  const [minesweeper, setMinesweeper] = useAtom(minesweeperAtom);

  const reset = () => {
    const newMinesweeper = minesweeper.reset();
    setMinesweeper(newMinesweeper);
  };

  return {
    minesweeper,
    setMinesweeper,
    reset,
  };
};
