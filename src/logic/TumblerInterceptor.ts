import { TumblerEvent, TumblerEventType } from "./TumblerEvent";
import { EmptyReceiver, TumblerPart } from "./TumblerPart";
import { TumblerBallColor, TumblerPartType, TumblerResult } from "./TumblerTypes";

export class TumblerInterceptor extends TumblerPart {
  constructor() {
    super(TumblerPartType.Interceptor, false, new EmptyReceiver(), new EmptyReceiver());

    this.leftEntrance = this.rightEntrance = {
      putBall: async (color: TumblerBallColor): Promise<TumblerResult> => {
        await this.reportEvent(new TumblerEvent(TumblerEventType.BallAtPart, TumblerPartType.Interceptor, color));
        return color === TumblerBallColor.Blue ? TumblerResult.BlueBallIntercepted : TumblerResult.RedBallIntercepted;
      },
    };
  }
}
