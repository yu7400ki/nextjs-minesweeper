import styled from "styled-components";
import { useMinesweeper } from "@/hooks/minesweeper";
import { displayState } from "@/minesweeper/minesweeper";
import { HiddenTile } from "./HiddenTile";
import { RevealedTile } from "./RevealedTile";

const BoardContainer = styled.div<{ width: number; height: number }>`
  width: ${(props) => props.width * 40}px;
  height: ${(props) => props.height * 40}px;
  display: grid;
  grid-template-columns: repeat(${(props) => props.width}, 1fr);
  grid-template-rows: repeat(${(props) => props.height}, 1fr);
  background-color: #c0c0c0;
  border-top: 4px solid #808080;
  border-left: 4px solid #808080;
  border-bottom: 4px solid #ffffff;
  border-right: 4px solid #ffffff;
`;

export const Board = () => {
  const { minesweeper, setMinesweeper } = useMinesweeper();

  const width = minesweeper.width;
  const height = minesweeper.height;
  const board = minesweeper.display;

  const reveal = (idx: number) => {
    const newBoard = minesweeper.reveal(idx);
    setMinesweeper(newBoard);
  };

  const toggleFlag = (idx: number) => {
    const newBoard = minesweeper.toggleFlag(idx);
    setMinesweeper(newBoard);
  };

  return (
    <BoardContainer
      width={width}
      height={height}
      onContextMenu={(e) => e.preventDefault()}
    >
      {board.map((cell, idx) => {
        switch (cell) {
          case displayState.hidden:
            return (
              <HiddenTile
                key={idx}
                flagged={false}
                onClick={() => reveal(idx)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  toggleFlag(idx);
                }}
              />
            );
          case displayState.flagged:
            return (
              <HiddenTile
                key={idx}
                flagged={true}
                onContextMenu={(e) => {
                  e.preventDefault();
                  toggleFlag(idx);
                }}
              />
            );
          default:
            return <RevealedTile key={idx} state={cell} />;
        }
      })}
    </BoardContainer>
  );
};
