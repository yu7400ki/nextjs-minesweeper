import styled from "styled-components";
import { Board } from "./Board";
import { Status } from "./Status";

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  background-color: #c0c0c0;
  width: fit-content;
  border-top: 5px solid #ffffff;
  border-left: 5px solid #ffffff;
  border-bottom: 5px solid #808080;
  border-right: 5px solid #808080;
`;

export const Game = () => {
  return (
    <GameContainer>
      <Status />
      <Board />
    </GameContainer>
  );
};
