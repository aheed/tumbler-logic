import { TumblerEvent, TumblerEventType } from "./TumblerEvent";
import { ITumblerObservable, TumblerObservable } from "./TumblerObservable";
import { IBallReceiver, ITumblerPartObserver, TumblerBallColor, TumblerPartType, TumblerResult } from "./TumblerTypes";

export interface IBallReleaser {
  release: () => Promise<TumblerResult>;
}

export class BallDispenser implements IBallReleaser, ITumblerObservable {
  color: TumblerBallColor;
  private balls: number;
  exit: IBallReceiver;
  private observableImplementation: TumblerObservable;

  constructor(color: TumblerBallColor, exit: IBallReceiver) {
    this.color = color;
    this.balls = 0;
    this.exit = exit;
    this.observableImplementation = new TumblerObservable();
  }

  public addObserver = (obs: ITumblerPartObserver) => this.observableImplementation.addObserver(obs);

  protected reportEvent = async (evt: TumblerEvent) => this.observableImplementation.reportEvent(evt);

  getBalls = (): number => this.balls;

  addBalls = (balls: number) => {
    this.balls += balls;
    this.reportEvent(new TumblerEvent(TumblerEventType.BallAddedToDispenser, TumblerPartType.Dispenser));
  };

  setBalls = (balls: number) => {
    this.balls = balls;
  };

  release = async (): Promise<TumblerResult> => {
    if (this.balls < 1) {
      this.reportEvent(new TumblerEvent(TumblerEventType.DispenserEmpty, TumblerPartType.Dispenser));
      return this.color === TumblerBallColor.Blue ? TumblerResult.BlueDispenserEmpty : TumblerResult.RedDispenserEmpty;
    }

    --this.balls;
    this.reportEvent(new TumblerEvent(TumblerEventType.BallDispensed, TumblerPartType.Dispenser));
    return await this.exit.putBall(this.color);
  };
}
