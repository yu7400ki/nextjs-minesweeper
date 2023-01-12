import styled from "styled-components";
import type { GameStatus } from "@/minesweeper";
import { gameStatus } from "@/minesweeper";

export const ResetButton = styled.button<{ status: GameStatus }>`
  width: 80px;
  height: 80px;
  background-color: #c0c0c0;
  border-top: 6px solid #ffffff;
  border-left: 6px solid #ffffff;
  border-bottom: 6px solid #808080;
  border-right: 6px solid #808080;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
    pointer-events: none;
    background-image: url("minesweeper.png");
    background-size: auto 100%;
    background-position: ${(props) => {
        switch (props.status) {
          case gameStatus.won:
            return `-720px`;
          case gameStatus.lost:
            return `-780px`;
          default:
            return `-660px`;
        }
      }}
      0;
  }

  &:active {
    border-top: 6px solid #808080;
    border-left: 6px solid #808080;
    border-bottom: 4px solid #808080;
    border-right: 4px solid #808080;
  }
`;
