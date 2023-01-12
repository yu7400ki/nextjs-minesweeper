import styled from "styled-components";
import { displayState } from "@/minesweeper/minesweeper";
import type { DisplayState } from "@/minesweeper/minesweeper";

export const RevealedTile = styled.div<{ state: DisplayState }>`
  width: 100%;
  height: 100%;
  background-color: #c0c0c0;
  border: 1px solid #818181;
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
    ${(props) => {
      switch (props.state) {
        case displayState.empty:
          return ``;
        case displayState.mine:
          return `
          background-image: url("minesweeper.png");
          background-position: -300px 0;
          background-size: auto 100%;
        `;
        default:
          return `
          background-image: url("minesweeper.png");
          background-position: -${(props.state - 1) * 30}px 0;
          background-size: auto 100%;
        `;
      }
    }}
  }
`;
