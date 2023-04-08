import { BallCollector } from "./BallCollector";
import { BallDispenser } from "./BallDispenser";
import { BallSink } from "./BallSink";
import { BoardModel } from "./model/BoardModel";
import { PartModel } from "./model/PartModel";
import { EmptyReceiver, TumblerPart } from "./TumblerPart";
import { TumblerPartFactory } from "./TumblerPartFactory";
import { IBallReceiver, TumblerBallColor, TumblerPartType } from "./TumblerTypes";

export class TumblerBoard {
  blueDispenser: BallDispenser;
  redDispenser: BallDispenser;
  blueCollector: BallCollector;
  redCollector: BallCollector;
  sink: BallSink;
  parts: TumblerPart[][];
  columns: number;
  rows: number;

  constructor(columns: number, rows: number, model?: BoardModel) {
    this.columns = columns;
    this.rows = rows;

    this.parts = [];

    // create array of placeholder parts. Each part will be replaced.
    for (let rowIndex = 0; rowIndex < rows; ++rowIndex) {
      let row: TumblerPart[] = [];
      for (let colIndex = 0; colIndex < rows; ++colIndex) {
        let p = TumblerPartFactory.createPart(TumblerPartType.NoPart, new EmptyReceiver(), new EmptyReceiver());
        row.push(p);
      }
      this.parts.push(row);
    }

    this.blueDispenser = new BallDispenser(TumblerBallColor.Blue, new EmptyReceiver());
    this.redDispenser = new BallDispenser(TumblerBallColor.Red, new EmptyReceiver());

    this.sink = new BallSink();
    this.blueCollector = new BallCollector(this.blueDispenser, this.sink, this.sink);
    this.redCollector = new BallCollector(this.redDispenser, this.sink, this.sink);

    // Populate the array with appropriate part types
    this.parts.forEach((row, rowIndex) =>
      row.forEach((column, colIndex) => this.setPart(this.getEmptyBoardPartType(colIndex, rowIndex), colIndex, rowIndex))
    );

    this.blueDispenser.exit = this.getPart(this.getBlueDispenserColumn(), 0)!.leftEntrance;
    this.redDispenser.exit = this.getPart(this.getRedDispenserColumn(), 0)!.rightEntrance;

    if (!!model) {
      this.init(model);
    }
  }

  getEmptyBoardPartType = (column: number, row: number): TumblerPartType => {
    let centerIndex = Math.floor(this.columns / 2);
    let res = (column + row) % 2 === 0 ? TumblerPartType.EmptyGearPeg : TumblerPartType.EmptyPartPeg;

    if (row === this.rows - 1) {
      if (column !== centerIndex) {
        res = TumblerPartType.NoPart;
      } else {
        res = TumblerPartType.EmptyPartPeg;
      }
    } else {
      if (column + row < centerIndex - 3) {
        res = TumblerPartType.NoPart;
      }

      if (column > centerIndex + 3 + row) {
        res = TumblerPartType.NoPart;
      }
    }

    if (row === 0 && column === centerIndex) {
      res = TumblerPartType.NoPart;
    }

    return res;
  };

  getPart = (column: number, row: number): TumblerPart | null => {
    if (column < 0 || column >= this.columns || row < 0 || row >= this.rows) {
      return null;
    }
    return this.parts[row][column];
  };

  getBlueDispenserColumn = (): number => {
    let centerIndex = Math.floor(this.columns / 2);
    return centerIndex - 2;
  };

  getRedDispenserColumn = (): number => {
    let centerIndex = Math.floor(this.columns / 2);
    return centerIndex + 2;
  };

  setExitNW = (newExit: IBallReceiver, column: number, row: number) => {
    let ballSourcePart = this.getPart(column - 1, row - 1);
    if (!!ballSourcePart) {
      ballSourcePart.rightExit = newExit;
    } else if (column === this.getBlueDispenserColumn() && row === 0) {
      this.blueDispenser.exit = newExit;
    }
  };

  setExitNE = (newExit: IBallReceiver, column: number, row: number) => {
    let ballSourcePart = this.getPart(column + 1, row - 1);
    if (!!ballSourcePart) {
      ballSourcePart.leftExit = newExit;
    } else if (column === this.getRedDispenserColumn() && row === 0) {
      this.redDispenser.exit = newExit;
    }
  };

  setPart = (partType: TumblerPartType, column: number, row: number, facingLeft?: boolean) => {
    let leftExit: IBallReceiver = new EmptyReceiver();
    let rightExit: IBallReceiver = new EmptyReceiver();

    let ballReceiverPart = this.getPart(column - 1, row + 1);
    if (!!ballReceiverPart) {
      leftExit = ballReceiverPart.rightEntrance;
    }

    ballReceiverPart = this.getPart(column + 1, row + 1);
    if (!!ballReceiverPart) {
      rightExit = ballReceiverPart.leftEntrance;
    }

    let centerIndex = Math.floor(this.columns / 2);
    if (row === this.rows - 1) {
      if (column === centerIndex) {
        leftExit = this.blueCollector;
        rightExit = this.redCollector;
      }
    }

    if (row === this.rows - 2) {
      if (column < centerIndex) {
        leftExit = this.blueCollector;
        if (column !== centerIndex - 1) {
          rightExit = this.blueCollector;
        }
      } else if (column > centerIndex) {
        rightExit = this.redCollector;
        if (column !== centerIndex + 1) {
          leftExit = this.redCollector;
        }
      }
    }

    let newPart = TumblerPartFactory.createPart(partType, leftExit, rightExit, facingLeft);

    if (partType !== TumblerPartType.NoPart) {
      this.setExitNW(newPart.leftEntrance, column, row);
      this.setExitNE(newPart.rightEntrance, column, row);
    }

    ////
    let gearNeighbor = this.getPart(column, row - 1);
    if (!!gearNeighbor) {
      newPart.n = gearNeighbor;
      gearNeighbor.s = newPart;
    }

    gearNeighbor = this.getPart(column, row + 1);
    if (!!gearNeighbor) {
      newPart.s = gearNeighbor;
      gearNeighbor.n = newPart;
    }

    gearNeighbor = this.getPart(column - 1, row);
    if (!!gearNeighbor) {
      newPart.w = gearNeighbor;
      gearNeighbor.e = newPart;
    }

    gearNeighbor = this.getPart(column + 1, row);
    if (!!gearNeighbor) {
      newPart.e = gearNeighbor;
      gearNeighbor.w = newPart;
    }
    ////

    this.parts[row][column] = newPart;
    newPart.updateGearPosition();
  };

  getModel = (): BoardModel => {
    let ret = new BoardModel(this.columns, this.rows);

    ret.blueBallsInDispenser = this.blueDispenser.getBalls();
    ret.redBallsInDispenser = this.redDispenser.getBalls();

    ret.parts = this.parts.map((row) => row.map((p) => new PartModel(p.partType, p.facingLeft)));

    return ret;
  };

  init = (model: BoardModel) => {
    this.blueDispenser.setBalls(model.blueBallsInDispenser);
    this.redDispenser.setBalls(model.redBallsInDispenser);

    this.sink = new BallSink();
    this.blueCollector = new BallCollector(this.blueDispenser, this.sink, this.sink);
    this.redCollector = new BallCollector(this.redDispenser, this.sink, this.sink);

    model.parts.forEach((row, rowIndex) =>
      row.forEach((part, colIndex) => {
        this.setPart(part.partType, colIndex, rowIndex, part.facingLeft);
      })
    );

    this.blueDispenser.exit = this.getPart(this.getBlueDispenserColumn(), 0)!.leftEntrance;
    this.redDispenser.exit = this.getPart(this.getRedDispenserColumn(), 0)!.rightEntrance;

    this.sink.reset();
  };

  removePart = (column: number, row: number) => {
    let targetType = this.getEmptyBoardPartType(column, row);
    this.setPart(targetType, column, row);
  };
}
