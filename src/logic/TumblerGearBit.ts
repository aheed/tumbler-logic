import { TumblerEvent, TumblerEventType } from "./TumblerEvent";
import { TumblerGearPartBase } from "./TumblerGearPartBase";
import { IBallReceiver, TumblerBallColor, TumblerPartType, TumblerResult } from "./TumblerTypes";

export class TumblerGearBit extends TumblerGearPartBase {
  constructor(leftExit: IBallReceiver, rightExit: IBallReceiver, facingLeft: boolean) {
    super(TumblerPartType.GearBit, leftExit, rightExit, facingLeft);

    const putBallHandler = (enterLeft: boolean) => async (color: TumblerBallColor): Promise<TumblerResult> => {
      let currentExit = this.gearSet ? this.leftExit : this.rightExit;
      this.reportEvent(new TumblerEvent(TumblerEventType.BallAtPart, TumblerPartType.GearBit, color, enterLeft, this.gearSet));
      await this.setGearPosition(!this.gearSet);

      return currentExit.putBall(color);
    };

    this.leftEntrance = {
      putBall: putBallHandler(true),
    };

    this.rightEntrance = {
      putBall: putBallHandler(false),
    };

    this.setGearPosition(facingLeft);
  }

  async setGearPosition(set: boolean) {
    super.setGearPosition(set);

    let evtType = set ? TumblerEventType.Set : TumblerEventType.Reset;
    return this.reportEvent(new TumblerEvent(evtType, TumblerPartType.GearBit));
  }
}
