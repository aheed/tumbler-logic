import { TumblerPart } from "./TumblerPart";
import { IBallReceiver, TumblerPartType } from "./TumblerTypes";

export class TumblerGearPartBase extends TumblerPart {
  gearSet?: boolean;

  constructor(partType: TumblerPartType, leftExit: IBallReceiver, rightExit: IBallReceiver, facingLeft: boolean) {
    super(partType, facingLeft, leftExit, rightExit);

    this.setGearPosition(facingLeft);
  }

  updateGearPosition = () => {
    this.n.setGearPosition(this.gearSet ?? false);
    this.s.setGearPosition(this.gearSet ?? false);
    this.e.setGearPosition(this.gearSet ?? false);
    this.w.setGearPosition(this.gearSet ?? false);
  };

  async setGearPosition(set: boolean) {
    if (set === this.gearSet) {
      return;
    }

    this.gearSet = set;
    this.facingLeft = set;
    this.updateGearPosition();
  }
}
