import styled from "styled-components";
import { Game } from "@/components/minesweeper";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
`;

export const Index = () => {
  return (
    <Wrapper>
      <Game />
    </Wrapper>
  );
};
