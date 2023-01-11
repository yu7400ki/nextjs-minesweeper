import styled from "styled-components";
import { useMinesweeper } from "@/hooks/minesweeper";
import { displayState } from "@/minesweeper/minesweeper";

const BoardContainer = styled.div<{ width: number; height: number }>`
  width: ${(props) => props.width * 40}px;
  height: ${(props) => props.height * 40}px;
  display: grid;
  grid-template-columns: repeat(${(props) => props.width}, 1fr);
  grid-template-rows: repeat(${(props) => props.height}, 1fr);
  background-color: #c0c0c0;
  border-top: 0.2em solid #808080;
  border-left: 0.2em solid #808080;
  border-bottom: 0.2em solid #ffffff;
  border-right: 0.2em solid #ffffff;
`;

const HiddenTile = styled.div<{ flagged: boolean }>`
  width: 100%;
  height: 100%;
  background-color: #c0c0c0;
  border-top: 4px solid #ffffff;
  border-left: 4px solid #ffffff;
  border-bottom: 4px solid #808080;
  border-right: 4px solid #808080;
  position: relative;
  &:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30px;
    height: 30px;
    pointer-events: none;
    ${(props) =>
      props.flagged &&
      `
      background-image: url("minesweeper.png");
      background-position: -270px 0;
      background-size: auto 100%;
      `}
  }
`;

export const Board = () => {
  const { minesweeper, setMinesweeper } = useMinesweeper();

  const width = minesweeper.width;
  const height = minesweeper.height;
  const board = minesweeper.display();

  const toggleFlag = (index: number) => {
    const x = index % width;
    const y = Math.floor(index / width);

    const newBoard = minesweeper.toggleFlag(x, y);
    setMinesweeper(newBoard);
  };

  return (
    <BoardContainer width={width} height={height}>
      {board.flat().map((cell, idx) => (
        <HiddenTile
          key={idx}
          flagged={cell === displayState.flagged}
          onContextMenu={(e) => {
            toggleFlag(idx);
            e.preventDefault();
          }}
        />
      ))}
    </BoardContainer>
  );
};
