import { useMemo } from "react";
import styled from "styled-components";
import { useMinesweeper } from "@/hooks/minesweeper";
import { ResetButton } from "./ResetButton";
import { DigitalNumber } from "./DigitalNumber";
import type { Props as DigitNumProps } from "./DigitalNumber";
import { useUpdater } from "@/hooks/updater";

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

const NumberWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  width: calc(48px * 3);
  margin: 0 6px;
`;

const ThreeDigit = ({ number }: { number: number }) => {
  let ones: DigitNumProps["number"];
  let tens: DigitNumProps["number"];
  let hundreds: DigitNumProps["number"];

  if (number < -99) {
    ones = "9";
    tens = "9";
    hundreds = "-";
  } else if (number < 0) {
    number = Math.abs(number);
    if (number < 10) {
      ones = String(number) as DigitNumProps["number"];
      tens = "-";
      hundreds = "0";
    } else {
      ones = String(number % 10) as DigitNumProps["number"];
      tens = String(Math.floor(number / 10)) as DigitNumProps["number"];
      hundreds = "-";
    }
  } else if (number > 999) {
    ones = "9";
    tens = "9";
    hundreds = "9";
  } else {
    ones = String(number % 10) as DigitNumProps["number"];
    tens = String(Math.floor(number / 10) % 10) as DigitNumProps["number"];
    hundreds = String(Math.floor(number / 100)) as DigitNumProps["number"];
  }

  return (
    <NumberWrapper>
      <DigitalNumber number={hundreds} />
      <DigitalNumber number={tens} />
      <DigitalNumber number={ones} />
    </NumberWrapper>
  );
};

export const Status = () => {
  const _ = useUpdater(1000); // eslint-disable-line @typescript-eslint/no-unused-vars
  const { minesweeper, reset } = useMinesweeper();

  const elapsed = minesweeper.elapsed;
  const remainingMines = useMemo(() => {
    const mines = minesweeper.mineNum;
    const flags = minesweeper.flagCount;
    return mines - flags;
  }, [minesweeper]);

  return (
    <StatusContainer width={minesweeper.width}>
      <ThreeDigit number={remainingMines} />
      <ResetButton status={minesweeper.status} onClick={reset} />
      <ThreeDigit number={elapsed} />
    </StatusContainer>
  );
};
