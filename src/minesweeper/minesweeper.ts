// gameStatus -------------------------------------
export const gameStatus = {
  notStarted: 0,
  inProgress: 1,
  won: 2,
  lost: 3,
} as const;

export type GameStatus = (typeof gameStatus)[keyof typeof gameStatus];
// ------------------------------------------------

// boardState -------------------------------------
export const boardState = {
  empty: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  mine: 9,
} as const;

export type BoardState = (typeof boardState)[keyof typeof boardState];
// ------------------------------------------------

// displayState -----------------------------------
export const displayState = {
  ...boardState,
  flagged: 10,
  hidden: 11,
} as const;

export type DisplayState = (typeof displayState)[keyof typeof displayState];
// Minesweeper ------------------------------------
export class Minesweeper {
  public gameStatus: GameStatus;
  private flagged: boolean[][];
  private hidden: boolean[][];
  private board: BoardState[][];
  readonly width: number;
  readonly height: number;
  readonly mineNum: number;

  constructor(width: number, height: number, mineNum: number) {
    if (width * height < mineNum) {
      throw new Error("Too many mines");
    }

    this.gameStatus = gameStatus.notStarted;
    this.flagged = array2d(width, height, false);
    this.hidden = array2d(width, height, true);
    this.board = array2d(width, height, boardState.empty);
    this.width = width;
    this.height = height;
    this.mineNum = mineNum;
  }

  public toggleFlag(x: number, y: number): Minesweeper {
    const clone = this.clone();

    if (clone.gameStatus === gameStatus.notStarted) {
      clone.initBoard(x, y);
      clone.gameStatus = gameStatus.inProgress;
    }

    if (clone.gameStatus === gameStatus.inProgress) {
      clone.flagged[y][x] = !clone.flagged[y][x];
    }

    return clone;
  }

  public display(): DisplayState[][] {
    return this.board.map((row, y) =>
      row.map((cell, x) => {
        if (this.hidden[y][x]) {
          return this.flagged[y][x]
            ? displayState.flagged
            : displayState.hidden;
        } else {
          return cell;
        }
      })
    );
  }

  public clone(): Minesweeper {
    const clone = new Minesweeper(this.width, this.height, this.mineNum);
    clone.gameStatus = this.gameStatus;
    clone.flagged = this.flagged.map((row) => row.slice());
    clone.hidden = this.hidden.map((row) => row.slice());
    clone.board = this.board.map((row) => row.slice());
    return clone;
  }

  private initBoard(x: number, y: number): void {
    const mines = this.mineNum;
    const width = this.width;
    const height = this.height;

    const minePositions = new Set<number>();
    while (minePositions.size < mines) {
      const mine = Math.floor(Math.random() * width * height);
      if (mine !== x + y * width) {
        minePositions.add(mine);
      }
    }

    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        if (minePositions.has(i + j * width)) {
          this.board[j][i] = boardState.mine;
        }
      }
    }

    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        if (this.board[j][i] === boardState.mine) {
          for (let k = -1; k <= 1; k++) {
            for (let l = -1; l <= 1; l++) {
              if (
                i + k >= 0 &&
                i + k < width &&
                j + l >= 0 &&
                j + l < height &&
                this.board[j + l][i + k] !== boardState.mine
              ) {
                this.board[j + l][i + k]++;
              }
            }
          }
        }
      }
    }
  }
}
// ------------------------------------------------

const array2d = <T>(width: number, height: number, value: T) => {
  return Array.from({ length: height }, () =>
    Array.from({ length: width }, () => value)
  );
};
