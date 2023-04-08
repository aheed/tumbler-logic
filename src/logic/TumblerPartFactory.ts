import { TumblerBit } from "./TumblerBit";
import { TumblerCrossover } from "./TumblerCrossover";
import { TumblerGear } from "./TumblerGear";
import { TumblerGearBit } from "./TumblerGearBit";
import { TumblerInterceptor } from "./TumblerInterceptor";
import { EmptyTumblerPart, TumblerPart } from "./TumblerPart";
import { TumblerRamp } from "./TumblerRamp";
import { IBallReceiver, TumblerPartType } from "./TumblerTypes";

export class TumblerPartFactory {
  static createPart = (partType: TumblerPartType, leftExit: IBallReceiver, rightExit: IBallReceiver, facingLeft?: boolean): TumblerPart => {
    switch (partType) {
      case TumblerPartType.Ramp:
        return new TumblerRamp(leftExit, rightExit, facingLeft ?? true);
      case TumblerPartType.Crossover:
        return new TumblerCrossover(leftExit, rightExit);
      case TumblerPartType.Interceptor:
        return new TumblerInterceptor();
      case TumblerPartType.Bit:
        return new TumblerBit(leftExit, rightExit, facingLeft ?? true);
      case TumblerPartType.GearBit:
        return new TumblerGearBit(leftExit, rightExit, facingLeft ?? true);
      case TumblerPartType.Gear:
        return new TumblerGear(leftExit, rightExit, facingLeft ?? true);
      case TumblerPartType.NoPart:
      case TumblerPartType.EmptyPartPeg:
      case TumblerPartType.EmptyGearPeg:
      default:
        return new EmptyTumblerPart(partType, leftExit, rightExit);
    }
  };
}
