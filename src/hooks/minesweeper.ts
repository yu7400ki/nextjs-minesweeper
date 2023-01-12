import { atom, useAtom } from "jotai";
import { Minesweeper } from "@/minesweeper";

const minesweeperAtom = atom(new Minesweeper(30, 16, 30));

export const useMinesweeper = () => {
  const [minesweeper, setMinesweeper] = useAtom(minesweeperAtom);

  return {
    minesweeper,
    setMinesweeper,
  };
};
