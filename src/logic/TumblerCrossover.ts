import { TumblerEvent, TumblerEventType } from "./TumblerEvent";
import { TumblerPart } from "./TumblerPart";
import { IBallReceiver, TumblerBallColor, TumblerPartType, TumblerResult } from "./TumblerTypes";

export class TumblerCrossover extends TumblerPart {
  constructor(leftExit: IBallReceiver, rightExit: IBallReceiver) {
    super(TumblerPartType.Crossover, false, leftExit, rightExit);

    const putBallHandler = (enterLeft: boolean) => async (color: TumblerBallColor): Promise<TumblerResult> => {
      await this.reportEvent(new TumblerEvent(TumblerEventType.BallAtPart, TumblerPartType.Crossover, color, enterLeft, !enterLeft));
      let destination = enterLeft ? this.rightExit : this.leftExit;
      return await destination.putBall(color);
    };

    this.leftEntrance = {
      putBall: putBallHandler(true),
    };

    this.rightEntrance = {
      putBall: putBallHandler(false),
    };
  }
}
