import { TumblerEvent, TumblerEventType } from "./TumblerEvent";
import { IGearInteractor, NullGearInteractor } from "./TumblerGearPart";
import { ITumblerObservable, TumblerObservable } from "./TumblerObservable";
import { IBallReceiver, ITumblerPartObserver, TumblerBallColor, TumblerPartType, TumblerResult } from "./TumblerTypes";

export abstract class TumblerPart implements IGearInteractor, ITumblerObservable {
  public leftEntrance: IBallReceiver;
  public rightEntrance: IBallReceiver;
  public leftExit: IBallReceiver;
  public rightExit: IBallReceiver;
  public partType: TumblerPartType;
  public facingLeft: boolean;
  private observableImplementation: TumblerObservable;
  n: IGearInteractor;
  s: IGearInteractor;
  e: IGearInteractor;
  w: IGearInteractor;

  constructor(partType: TumblerPartType, facingLeft: boolean, leftExit: IBallReceiver, rightExit: IBallReceiver) {
    this.partType = partType;
    this.facingLeft = facingLeft;
    this.leftExit = leftExit;
    this.rightExit = rightExit;
    this.leftEntrance = this.rightEntrance = { putBall: async (c) => TumblerResult.Error };
    this.observableImplementation = new TumblerObservable();
    this.n = this.s = this.w = this.e = new NullGearInteractor();
  }

  public addObserver = (obs: ITumblerPartObserver) => this.observableImplementation.addObserver(obs);

  protected reportEvent = async (evt: TumblerEvent) => this.observableImplementation.reportEvent(evt);

  setGearPosition(set: boolean) {}
  updateGearPosition() {}
}

export class EmptyReceiver implements IBallReceiver {
  putBall = async (color: TumblerBallColor): Promise<TumblerResult> => {
    return color === TumblerBallColor.Blue ? TumblerResult.BlueBallDropped : TumblerResult.RedBallDropped;
  };
}

export class EmptyTumblerPart extends TumblerPart {
  constructor(partType: TumblerPartType, leftExit: IBallReceiver, rightExit: IBallReceiver) {
    super(partType, false, leftExit, rightExit);

    const putBallHandler = (enterLeft: boolean) => async (c: TumblerBallColor) => {
      await this.reportEvent(new TumblerEvent(TumblerEventType.BallDropped, TumblerPartType.NoPart, c, enterLeft));
      return c === TumblerBallColor.Blue ? TumblerResult.BlueBallDropped : TumblerResult.RedBallDropped;
    };

    this.leftEntrance = {
      putBall: putBallHandler(true),
    };

    this.rightEntrance = {
      putBall: putBallHandler(false),
    };
  }
}
