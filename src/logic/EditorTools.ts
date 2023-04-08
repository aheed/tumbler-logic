import { TumblerPartType } from "./TumblerTypes";

export enum EditorToolType {
  Erase = 0,
  Flip,
  Ramp,
  Crossover,
  Bit,
  GearBit,
  Interceptor,
}

export const getPartTypeByTool = (toolType: EditorToolType): TumblerPartType | null => {
  switch (toolType) {
    case EditorToolType.Erase:
      return null;

    case EditorToolType.Ramp:
      return TumblerPartType.Ramp;

    case EditorToolType.Crossover:
      return TumblerPartType.Crossover;

    case EditorToolType.Bit:
      return TumblerPartType.Bit;

    case EditorToolType.GearBit:
      return TumblerPartType.GearBit;

    case EditorToolType.Interceptor:
      return TumblerPartType.Interceptor;

    case EditorToolType.Flip:
      return null;

    default:
      throw new Error("Should not happen");
  }
};
