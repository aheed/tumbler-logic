import React from "react";
import { IBallReceiver, ITumblerPartObserver, TumblerBallColor, TumblerPartType, TumblerResult } from "./TumblerTypes";
import { TumblerEvent, TumblerEventType } from "./TumblerEvent";
import { TumblerRamp } from "./TumblerRamp";
import { TumblerCrossover } from "./TumblerCrossover";

class BallReceiverSpy implements IBallReceiver {
  //receivedColor?: TumblerBallColor;
  receivedBalls = 0;
  putBall = async (c: TumblerBallColor) => {
    ++this.receivedBalls;
    return c === TumblerBallColor.Blue ? TumblerResult.BlueBallIntercepted : TumblerResult.RedBallIntercepted;
  };
}

class ObserverSpy implements ITumblerPartObserver {
  lastObservedEvent?: TumblerEvent;

  reportEvent = async (evt: TumblerEvent) => {
    this.lastObservedEvent = evt;
    console.log(TumblerEventType[evt.eventType]);
  };
}

test("ramp faces left, blue ball inserted, blue ball comes out left", async () => {
  // Arrange
  let left = new BallReceiverSpy();
  let right = new BallReceiverSpy();
  let ramp = new TumblerRamp(left, right, true);

  // Act
  let res = await ramp.leftEntrance.putBall(TumblerBallColor.Blue);

  // Evaluate
  expect(res).toBe(TumblerResult.BlueBallIntercepted);
  expect(left.receivedBalls).toBe(1);
  expect(right.receivedBalls).toBe(0);
});

test("ramp faces right, blue ball inserted, blue ball comes out right", async () => {
  // Arrange
  let left = new BallReceiverSpy();
  let right = new BallReceiverSpy();
  let ramp = new TumblerRamp(left, right, false);

  // Act
  let res = await ramp.leftEntrance.putBall(TumblerBallColor.Blue);

  // Evaluate
  expect(res).toBe(TumblerResult.BlueBallIntercepted);
  expect(left.receivedBalls).toBe(0);
  expect(right.receivedBalls).toBe(1);
});

test("ramp faces right, blue ball inserted, Ramp Left-to-Right event reported", async () => {
  // Arrange
  let left = new BallReceiverSpy();
  let right = new BallReceiverSpy();
  let ramp = new TumblerRamp(left, right, false);
  let obsSpy = new ObserverSpy();
  ramp.addObserver(obsSpy);

  // Act
  let res = await ramp.leftEntrance.putBall(TumblerBallColor.Blue);

  // Evaluate
  expect(obsSpy.lastObservedEvent?.eventType).toBe(TumblerEventType.BallAtPart);
  expect(obsSpy.lastObservedEvent?.partType).toBe(TumblerPartType.Ramp);
  expect(obsSpy.lastObservedEvent?.enterLeft).toBe(true);
  expect(obsSpy.lastObservedEvent?.exitLeft).toBe(false);
});

test("ramp faces right, blue ball inserted, Ramp Right-to-Right event reported", async () => {
  // Arrange
  let left = new BallReceiverSpy();
  let right = new BallReceiverSpy();
  let ramp = new TumblerRamp(left, right, false);
  let obsSpy = new ObserverSpy();
  ramp.addObserver(obsSpy);

  // Act
  let res = await ramp.rightEntrance.putBall(TumblerBallColor.Blue);

  // Evaluate
  expect(obsSpy.lastObservedEvent?.eventType).toBe(TumblerEventType.BallAtPart);
  expect(obsSpy.lastObservedEvent?.partType).toBe(TumblerPartType.Ramp);
  expect(obsSpy.lastObservedEvent?.enterLeft).toBe(false);
  expect(obsSpy.lastObservedEvent?.exitLeft).toBe(false);
});

test("crossover, blue ball inserted right, blue ball comes out left", async () => {
  // Arrange
  let left = new BallReceiverSpy();
  let right = new BallReceiverSpy();
  let co = new TumblerCrossover(left, right);

  // Act
  let res = await co.rightEntrance.putBall(TumblerBallColor.Blue);

  // Evaluate
  expect(res).toBe(TumblerResult.BlueBallIntercepted);
  expect(left.receivedBalls).toBe(1);
  expect(right.receivedBalls).toBe(0);
});

test("crossover, red ball inserted left, red ball comes out right", async () => {
  // Arrange
  let left = new BallReceiverSpy();
  let right = new BallReceiverSpy();
  let co = new TumblerCrossover(left, right);

  // Act
  let res = await co.leftEntrance.putBall(TumblerBallColor.Red);

  // Evaluate
  expect(res).toBe(TumblerResult.RedBallIntercepted);
  expect(left.receivedBalls).toBe(0);
  expect(right.receivedBalls).toBe(1);
});
