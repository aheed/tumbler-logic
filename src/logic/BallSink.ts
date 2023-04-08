import { TumblerEvent, TumblerEventType } from "./TumblerEvent";
import { ITumblerObservable, TumblerObservable } from "./TumblerObservable";
import { IBallReceiver, ITumblerPartObserver, TumblerBallColor, TumblerPartType, TumblerResult } from "./TumblerTypes";

export interface IBallSink extends ITumblerObservable {
  getBalls: () => TumblerBallColor[];
  reset: () => Promise<void>;
}

export interface IBallSinkController {
  reset: () => Promise<void>;
}

export class BallSink implements IBallReceiver, IBallSink, IBallSinkController {
  private observableImplementation: TumblerObservable;
  private balls: TumblerBallColor[] = [];

  constructor() {
    this.observableImplementation = new TumblerObservable();
    this.reset();
  }

  public addObserver = (obs: ITumblerPartObserver) => this.observableImplementation.addObserver(obs);

  putBall = async (color: TumblerBallColor): Promise<TumblerResult> => {
    this.balls.push(color);
    await this.observableImplementation.reportEvent(new TumblerEvent(TumblerEventType.BallSinkUpdated, TumblerPartType.NoPart, color));
    return TumblerResult.NoResult;
  };

  getBalls = (): TumblerBallColor[] => this.balls;

  reset = async () => {
    this.balls = [];
    await this.observableImplementation.reportEvent(new TumblerEvent(TumblerEventType.BallSinkUpdated, TumblerPartType.NoPart));
  };
}
