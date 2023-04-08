import { TumblerEvent, TumblerEventType } from "./TumblerEvent";
import { TumblerPart } from "./TumblerPart";
import { IBallReceiver, TumblerBallColor, TumblerPartType, TumblerResult } from "./TumblerTypes";

export class TumblerBit extends TumblerPart {
  set: boolean;

  constructor(leftExit: IBallReceiver, rightExit: IBallReceiver, facingLeft: boolean) {
    super(TumblerPartType.Bit, facingLeft, leftExit, rightExit);
    this.set = facingLeft;

    const putBallHandler = (enterLeft: boolean) => async (color: TumblerBallColor): Promise<TumblerResult> => {
      let evtType = this.set ? TumblerEventType.Reset : TumblerEventType.Set;
      let evt = new TumblerEvent(evtType, TumblerPartType.Bit, color, enterLeft, this.set);
      let currentExit = this.set ? this.leftExit : this.rightExit;
      this.set = !this.set;
      await this.reportEvent(evt);
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
