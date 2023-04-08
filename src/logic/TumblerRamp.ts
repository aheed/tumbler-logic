import { TumblerEvent, TumblerEventType } from "./TumblerEvent";
import { TumblerPart } from "./TumblerPart";
import { IBallReceiver, TumblerBallColor, TumblerPartType, TumblerResult } from "./TumblerTypes";

export class TumblerRamp extends TumblerPart {
  constructor(leftExit: IBallReceiver, rightExit: IBallReceiver, facingLeft: boolean) {
    super(TumblerPartType.Ramp, facingLeft, leftExit, rightExit);

    const putBallHandler = (enterLeft: boolean) => async (color: TumblerBallColor): Promise<TumblerResult> => {
      let evt = new TumblerEvent(TumblerEventType.BallAtPart, TumblerPartType.Ramp, color, enterLeft, this.facingLeft);
      await this.reportEvent(evt);
      let currentExit = this.facingLeft ? this.leftExit : this.rightExit;
      return currentExit.putBall(color);
    };

    this.leftEntrance = {
      putBall: putBallHandler(true),
    };

    this.rightEntrance = {
      putBall: putBallHandler(false),
    };
  }
}
