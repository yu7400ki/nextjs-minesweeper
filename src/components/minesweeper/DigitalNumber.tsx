import styled from "styled-components";

export type Props = {
  number: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "-";
};

export const DigitalNumber = styled.div<{ number: Props["number"] }>`
  box-sizing: border-box;
  position: relative;
  width: 48px;
  height: 80px;
  border: solid 4px #111;
  background-color: #111;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    transform: translate(-50%, -50%) rotate(45deg);

    ${({ number }) => {
      switch (number) {
        case "0":
          return `
          background-color: #3a0000;
          box-shadow: -23px -23px red,
                      0px -23px red,
                      -23px 0px red,
                      0px 23px red,
                      23px 0px red,
                      23px 23px red;
        `;
        case "1":
          return `
          background-color: #3a0000;
          box-shadow: -23px -23px #3a0000,
                      0px -23px red,
                      -23px 0px #3a0000,
                      0px 23px #3a0000,
                      23px 0px red,
                      23px 23px #3a0000;
        `;
        case "2":
          return `
          background-color: red;
          box-shadow: -23px -23px red,
                      0px -23px red,
                      -23px 0px #3a0000,
                      0px 23px red,
                      23px 0px #3a0000,
                      23px 23px red;
        `;
        case "3":
          return `
          background-color: red;
          box-shadow: -23px -23px red,
                      0px -23px red,
                      -23px 0px #3a0000,
                      0px 23px #3a0000,
                      23px 0px red,
                      23px 23px red;
        `;
        case "4":
          return `
          background-color: red;
          box-shadow: -23px -23px #3a0000,
                      0px -23px red,
                      -23px 0px red,
                      0px 23px #3a0000,
                      23px 0px red,
                      23px 23px #3a0000;
        `;
        case "5":
          return `
          background-color: red;
          box-shadow: -23px -23px red,
                      0px -23px #3a0000,
                      -23px 0px red,
                      0px 23px #3a0000,
                      23px 0px red,
                      23px 23px red;
        `;
        case "6":
          return `
          background-color: red;
          box-shadow: -23px -23px red,
                      0px -23px #3a0000,
                      -23px 0px red,
                      0px 23px red,
                      23px 0px red,
                      23px 23px red;
        `;
        case "7":
          return `
          background-color: #3a0000;
          box-shadow: -23px -23px red,
                      0px -23px red,
                      -23px 0px #3a0000,
                      0px 23px #3a0000,
                      23px 0px red,
                      23px 23px #3a0000;
        `;
        case "8":
          return `
          background-color: red;
          box-shadow: -23px -23px red,
                      0px -23px red,
                      -23px 0px red,
                      0px 23px red,
                      23px 0px red,
                      23px 23px red;
        `;
        case "9":
          return `
          background-color: red;
          box-shadow: -23px -23px red,
                      0px -23px red,
                      -23px 0px red,
                      0px 23px #3a0000,
                      23px 0px red,
                      23px 23px red;
        `;
        case "-":
          return `
          background-color: red;
          box-shadow: -23px -23px #3a0000,
                      0px -23px #3a0000,
                      -23px 0px #3a0000,
                      0px 23px #3a0000,
                      23px 0px #3a0000,
                      23px 23px #3a0000;
        `;
      }
    }}
  }

  &:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 25px;
    height: 7px;
    border-top: solid 25px #111;
    border-bottom: solid 25px #111;
    transform: translate(-50%, -50%);
  }
`;
