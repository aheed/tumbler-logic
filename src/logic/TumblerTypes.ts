import { TumblerEvent } from "./TumblerEvent";

export enum TumblerBallColor {
  Blue = 0,
  Red,
  __LENGTH,
}

export enum TumblerPartType {
  NoPart = 0,
  EmptyPartPeg,
  EmptyGearPeg,
  Ramp,
  Crossover,
  Bit,
  GearBit,
  Gear,
  Interceptor,
  Dispenser,
  Collector,
  __LENGTH,
}

export enum TumblerResult {
  BlueBallIntercepted = 0,
  RedBallIntercepted,
  BlueDispenserEmpty,
  RedDispenserEmpty,
  BlueBallDropped,
  RedBallDropped,
  Error,
  NoResult,
}

export interface IBallReceiver {
  putBall: (color: TumblerBallColor) => Promise<TumblerResult>;
}

export interface ITumblerPartObserver {
  reportEvent: (evt: TumblerEvent) => Promise<void>;
}

export interface IReleaseButton {
  buttonPressed: () => Promise<TumblerResult>;
}
