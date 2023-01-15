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

// coverState -------------------------------------
export const coverState = {
  hidden: 0,
  flagged: 1,
  revealed: 2,
} as const;

export type CoverState = (typeof coverState)[keyof typeof coverState];
// ------------------------------------------------

// Minesweeper ------------------------------------
export class Minesweeper {
  private gameStatus: GameStatus;
  private cover: CoverState[];
  private board: BoardState[];
  private elapsedTime: number;
  private timerId: number;
  readonly width: number;
  readonly height: number;
  readonly mines: number;

  constructor(width: number, height: number, mines: number) {
    if (width * height < mines + 1) {
      throw new Error("Too many mines");
    }

    this.gameStatus = gameStatus.notStarted;
    this.cover = Array(width * height).fill(coverState.hidden);
    this.board = Array(width * height).fill(boardState.empty);
    this.width = width;
    this.height = height;
    this.mines = mines;
    this.elapsedTime = 0;
    this.timerId = Number(
      setInterval(() => {
        if (this.gameStatus === gameStatus.inProgress) {
          this.elapsedTime++;
        }
      }, 100)
    );
  }

  public reveal(idx: number): Minesweeper {
    const clone = this.clone();

    if (clone.gameStatus === gameStatus.notStarted) {
      clone.initBoard(idx);
      clone.gameStatus = gameStatus.inProgress;
    }

    if (clone.gameStatus !== gameStatus.inProgress) {
      return clone;
    }

    if (clone.isFlagged(idx) || clone.isRevealed(idx)) {
      return clone;
    }

    clone.cover[idx] = coverState.revealed;
    if (clone.isMine(idx)) {
      clone.gameStatus = gameStatus.lost;
      clone.revealMines();
      return clone;
    }

    const width = clone.width;
    const height = clone.height;
    if (clone.isEmpty(idx)) {
      const stack = [idx];
      while (stack.length > 0) {
        const idx = stack.pop()!;
        for (const k of [-width, 0, width]) {
          for (const l of [-1, 0, 1]) {
            const pos = idx + k + l;
            const x = idx % width;
            if (
              pos >= 0 &&
              pos < width * height &&
              (x !== 0 || l !== -1) &&
              (x !== width - 1 || l !== 1) &&
              clone.isHidden(pos)
            ) {
              clone.cover[pos] = coverState.revealed;
              if (clone.isEmpty(pos)) {
                stack.push(pos);
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

    return clone;
  }

  public toggleFlag(idx: number): Minesweeper {
    const clone = this.clone();

    if (clone.gameStatus === gameStatus.notStarted) {
      clone.initBoard(idx);
      clone.gameStatus = gameStatus.inProgress;
    }

    switch (clone.cover[idx]) {
      case coverState.hidden:
        clone.cover[idx] = coverState.flagged;
        break;
      case coverState.flagged:
        clone.cover[idx] = coverState.hidden;
        break;
      default:
        break;
    }

    return clone;
  }

  public clone(): Minesweeper {
    const clone = new Minesweeper(this.width, this.height, this.mines);
    clone.gameStatus = this.gameStatus;
    clone.cover = this.cover.slice();
    clone.board = this.board.slice();
    clone.elapsedTime = this.elapsedTime;
    return clone;
  }

  public reset(): Minesweeper {
    clearInterval(this.timerId);
    return new Minesweeper(this.width, this.height, this.mines);
  }

  public get display(): DisplayState[] {
    return this.board.map((cell, idx) => {
      if (this.isHidden(idx)) {
        return this.isFlagged(idx) ? displayState.flagged : displayState.hidden;
      } else {
        return cell;
      }
    });
  }

  public get status(): GameStatus {
    return this.gameStatus;
  }

  public get flags(): number {
    return this.cover.filter((cell) => cell === coverState.flagged).length;
  }

  public get elapsed(): number {
    return Math.floor(this.elapsedTime / 10);
  }

  private isMine(idx: number): boolean {
    return this.board[idx] === boardState.mine;
  }

  private isEmpty(idx: number): boolean {
    return this.board[idx] === boardState.empty;
  }

  private isHidden(idx: number): boolean {
    return (
      this.cover[idx] === coverState.hidden ||
      this.cover[idx] === coverState.flagged
    );
  }

  private isFlagged(idx: number): boolean {
    return this.cover[idx] === coverState.flagged;
  }

  private isRevealed(idx: number): boolean {
    return this.cover[idx] === coverState.revealed;
  }

  private isWon(): boolean {
    return this.cover.every(
      (_, idx) => this.isHidden(idx) === this.isMine(idx)
    );
  }

  private flagMines(): void {
    this.cover = this.cover.map((cell, idx) =>
      this.isMine(idx) ? coverState.flagged : cell
    );
  }

  private revealMines(): void {
    this.cover = this.cover.map((cell, idx) =>
      this.isMine(idx) ? coverState.revealed : cell
    );
  }

  private initBoard(idx: number): void {
    const mines = this.mines;
    const width = this.width;
    const height = this.height;

    const minePositions = new Set<number>();
    while (minePositions.size < mines) {
      const pos = Math.floor(Math.random() * width * height);
      if (pos !== idx) {
        minePositions.add(pos);
      }
    }

    for (let i = 0; i < width * height; i++) {
      if (minePositions.has(i)) {
        this.board[i] = boardState.mine;
        for (const k of [-width, 0, width]) {
          for (const l of [-1, 0, 1]) {
            const pos = i + k + l;
            const x = i % width;
            if (
              pos >= 0 &&
              pos < width * height &&
              (x !== 0 || l !== -1) &&
              (x !== width - 1 || l !== 1) &&
              !this.isMine(pos)
            ) {
              this.board[pos]++;
            }
          }
        }
      }
    }
  }
}
// ------------------------------------------------
