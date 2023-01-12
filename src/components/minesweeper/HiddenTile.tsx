import styled from "styled-components";

export const HiddenTile = styled.div<{ flagged: boolean }>`
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
