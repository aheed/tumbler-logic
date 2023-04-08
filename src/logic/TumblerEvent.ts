import { TumblerBallColor, TumblerPartType } from "./TumblerTypes";

export enum TumblerEventType {
  BallAtPart,
  Set,
  Reset,
  DispenserEmpty,
  BallDispensed,
  BallAddedToDispenser,
  BallCollected,
  BallReleased,
  BallDropped,
  BallSinkUpdated,
  None,
}

export class TumblerEvent {
  eventType: TumblerEventType;
  partType?: TumblerPartType;
  ballColor?: TumblerBallColor;
  enterLeft?: boolean;
  exitLeft?: boolean;

  constructor(eventType: TumblerEventType, partType: TumblerPartType, ballColor?: TumblerBallColor, enterLeft?: boolean, exitLeft?: boolean) {
    this.eventType = eventType;
    this.partType = partType;
    this.ballColor = ballColor;
    this.enterLeft = enterLeft;
    this.exitLeft = exitLeft;
  }
}
