import { TumblerPartType } from "../TumblerTypes";
import { PartModel } from "./PartModel";

export class BoardModel {
  columns: number;
  rows: number;
  parts: PartModel[][];
  blueBallsInDispenser: number;
  redBallsInDispenser: number;

  static readonly default_nof_rows = 11;
  static readonly default_nof_columns = 11;

  constructor(columns: number = BoardModel.default_nof_columns, rows: number = BoardModel.default_nof_rows) {
    this.columns = columns;
    this.rows = rows;
    this.parts = [];

    for (let rowIndex = 0; rowIndex < rows; ++rowIndex) {
      let row: PartModel[] = [];
      for (let colIndex = 0; colIndex < rows; ++colIndex) {
        let p = new PartModel(TumblerPartType.NoPart);
        row.push(p);
      }
      this.parts.push(row);
    }

    this.blueBallsInDispenser = 0;
    this.redBallsInDispenser = 0;
  }
}
