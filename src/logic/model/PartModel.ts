import { TumblerPartType } from "../TumblerTypes";

export class PartModel {
  partType: TumblerPartType;
  facingLeft?: boolean;

  constructor(partType: TumblerPartType, facingLeft?: boolean) {
    this.partType = partType;
    this.facingLeft = facingLeft;
  }
}
