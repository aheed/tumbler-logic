import { TumblerEvent } from "./TumblerEvent";
import { ITumblerPartObserver } from "./TumblerTypes";

export interface ITumblerObservable {
  addObserver: (obs: ITumblerPartObserver) => void;
}

export interface ITumblerReporter {
  reportEvent: (evt: TumblerEvent) => void;
}

export class TumblerObservable implements ITumblerObservable, ITumblerReporter {
  private observers: ITumblerPartObserver[] = [];

  public addObserver = (obs: ITumblerPartObserver) => this.observers.push(obs);

  reportEvent = async (evt: TumblerEvent) => {
    for (let i = 0; i < this.observers.length; ++i) {
      await this.observers[i].reportEvent(evt);
    }
  };
}
