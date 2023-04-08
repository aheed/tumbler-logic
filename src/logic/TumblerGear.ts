import { TumblerEvent, TumblerEventType } from "./TumblerEvent";
import { TumblerGearPartBase } from "./TumblerGearPartBase";
import { IBallReceiver, TumblerPartType } from "./TumblerTypes";

export class TumblerGear extends TumblerGearPartBase {
  constructor(leftExit: IBallReceiver, rightExit: IBallReceiver, facingLeft: boolean) {
    super(TumblerPartType.Gear, leftExit, rightExit, facingLeft);

    this.setGearPosition(facingLeft);
  }

  async setGearPosition(set: boolean) {
    super.setGearPosition(set);

    let evtType = set ? TumblerEventType.Set : TumblerEventType.Reset;
    let evt = new TumblerEvent(evtType, TumblerPartType.Gear);
    return this.reportEvent(evt);
  }
}
