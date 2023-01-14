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
// ------------------------------------------------

// Minesweeper ------------------------------------
export class Minesweeper {
  private gameStatus: GameStatus;
  private flagged: boolean[][];
  private hidden: boolean[][];
  private board: BoardState[][];
  private elapsedTime: number;
  private timerId: number;
  readonly width: number;
  readonly height: number;
  readonly mineNum: number;

  constructor(width: number, height: number, mineNum: number) {
    if (width * height < mineNum + 1) {
      throw new Error("Too many mines");
    }

    this.gameStatus = gameStatus.notStarted;
    this.flagged = array2d(width, height, false);
    this.hidden = array2d(width, height, true);
    this.board = array2d(width, height, boardState.empty);
    this.width = width;
    this.height = height;
    this.mineNum = mineNum;
    this.elapsedTime = 0;

    this.timerId = Number(
      setInterval(() => {
        if (this.gameStatus === gameStatus.inProgress) {
          this.elapsedTime++;
        }
      }, 100)
    );
  }

  public reveal(x: number, y: number): Minesweeper {
    const clone = this.clone();

    if (clone.gameStatus === gameStatus.notStarted) {
      clone.initBoard(x, y);
      clone.gameStatus = gameStatus.inProgress;
    }

    if (clone.gameStatus !== gameStatus.inProgress) {
      return clone;
    }

    if (clone.flagged[y][x] || !this.hidden[y][x]) {
      return clone;
    }

    clone.hidden[y][x] = false;
    if (clone.isMine(x, y)) {
      clone.gameStatus = gameStatus.lost;
      clone.revealMines();
      return clone;
    }

    if (clone.isEmpty(x, y)) {
      const queue = [[x, y]];
      while (queue.length > 0) {
        const [x, y] = queue.pop()!;
        for (let k = -1; k <= 1; k++) {
          for (let l = -1; l <= 1; l++) {
            if (
              x + k >= 0 &&
              x + k < clone.width &&
              y + l >= 0 &&
              y + l < clone.height &&
              clone.hidden[y + l][x + k]
            ) {
              clone.hidden[y + l][x + k] = false;
              if (clone.isEmpty(x + k, y + l)) {
                queue.push([x + k, y + l]);
              }
            }
          }
        }
      }
    }

    if (clone.isWon()) {
      clone.gameStatus = gameStatus.won;
      clone.flagMines();
    }

    clone.removeRevealedFlags();

    return clone;
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
    clone.elapsedTime = this.elapsedTime;
    return clone;
  }

  public get status(): GameStatus {
    return this.gameStatus;
  }

  public get flagCount(): number {
    return this.flagged.reduce(
      (count, row) => count + row.filter((cell) => cell).length,
      0
    );
  }

  public get elapsed(): number {
    return Math.floor(this.elapsedTime / 10);
  }

  public isMine(x: number, y: number): boolean {
    return this.board[y][x] === boardState.mine;
  }

  public isEmpty(x: number, y: number): boolean {
    return this.board[y][x] === boardState.empty;
  }

  public isWon(): boolean {
    return this.hidden.every((row, y) =>
      row.every((cell, x) => cell === this.isMine(x, y))
    );
  }

  public clearTimer(): void {
    clearInterval(this.timerId);
  }

  private flagMines(): void {
    this.flagged = this.flagged.map((row, y) =>
      row.map((cell, x) => cell || this.isMine(x, y))
    );
  }

  private revealMines(): void {
    this.hidden = this.hidden.map((row, y) =>
      row.map((cell, x) => cell && !this.isMine(x, y))
    );
    this.removeRevealedFlags();
  }

  private removeRevealedFlags(): void {
    this.flagged = this.flagged.map((row, y) =>
      row.map((cell, x) => cell && this.hidden[y][x])
    );
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
        if (this.board[j][i] !== boardState.mine) {
          continue;
        }
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
// ------------------------------------------------

const array2d = <T>(width: number, height: number, value: T) => {
  return Array.from({ length: height }, () =>
    Array.from({ length: width }, () => value)
  );
};
