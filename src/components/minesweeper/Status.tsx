import styled from "styled-components";
import { useMinesweeper } from "@/hooks/minesweeper";
import { ResetButton } from "./ResetButton";

const StatusContainer = styled.div<{ width: number }>`
  width: ${(props) => props.width * 40}px;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #c0c0c0;
  border-top: 5px solid #808080;
  border-left: 5px solid #808080;
  border-bottom: 5px solid #ffffff;
  border-right: 5px solid #ffffff;
`;

export const Status = () => {
  const { minesweeper, reset } = useMinesweeper();

  return (
    <StatusContainer width={minesweeper.width}>
      <div></div>
      <ResetButton status={minesweeper.status} onClick={reset} />
      <div></div>
    </StatusContainer>
  );
};
