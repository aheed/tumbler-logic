import React from "react";
import { IBallReceiver, ITumblerPartObserver, TumblerBallColor, TumblerPartType, TumblerResult } from "./TumblerTypes";
import { TumblerBoard } from "./TumblerBoard";

const boardNofColumns = 11;
const boardNofRows = 11;

test("board created, board is populated with correct parts", async () => {
  // Arrange

  // Act
  let board = new TumblerBoard(boardNofColumns, boardNofRows);

  // Evaluate
  expect(board.getPart(0, 0)?.partType).toBe(TumblerPartType.NoPart);
  expect(board.getPart(1, 0)?.partType).toBe(TumblerPartType.NoPart);
  expect(board.getPart(2, 0)?.partType).toBe(TumblerPartType.EmptyGearPeg);
  expect(board.getPart(3, 0)?.partType).toBe(TumblerPartType.EmptyPartPeg);
  expect(board.getPart(boardNofColumns - 1, 0)?.partType).toBe(TumblerPartType.NoPart);
  expect(board.getPart(boardNofColumns - 2, 0)?.partType).toBe(TumblerPartType.NoPart);
  expect(board.getPart(boardNofColumns - 3, 0)?.partType).toBe(TumblerPartType.EmptyGearPeg);
  expect(board.getPart(boardNofColumns - 4, 0)?.partType).toBe(TumblerPartType.EmptyPartPeg);
  expect(board.getPart(0, 1)?.partType).toBe(TumblerPartType.NoPart);
  expect(board.getPart(1, 1)?.partType).toBe(TumblerPartType.EmptyGearPeg);
  expect(board.getPart(0, boardNofRows - 1)?.partType).toBe(TumblerPartType.NoPart);
  expect(board.getPart(4, boardNofRows - 1)?.partType).toBe(TumblerPartType.NoPart);
  expect(board.getPart(5, boardNofRows - 1)?.partType).toBe(TumblerPartType.EmptyPartPeg);
  expect(board.getPart(6, boardNofRows - 1)?.partType).toBe(TumblerPartType.NoPart);
  expect(board.columns).toBe(boardNofColumns);
  expect(board.rows).toBe(boardNofRows);
});

test("empty dispenser, triggered collector, end of sequence", async () => {
  // Arrange
  let board = new TumblerBoard(boardNofColumns, boardNofRows);

  // Act
  let outcome = await board.blueCollector.putBall(TumblerBallColor.Blue);

  // Evaluate
  expect(outcome).toBe(TumblerResult.BlueDispenserEmpty);
});

test("No parts, triggered collector, ball dropped", async () => {
  // Arrange
  let board = new TumblerBoard(boardNofColumns, boardNofRows);
  board.blueDispenser.addBalls(5);

  // Act
  let outcome = await board.blueCollector.putBall(TumblerBallColor.Blue);

  // Evaluate
  expect(outcome).toBe(TumblerResult.BlueBallDropped);
});

test("Interceptor, triggered collector, interception", async () => {
  // Arrange
  let board = new TumblerBoard(boardNofColumns, boardNofRows);
  board.setPart(TumblerPartType.Interceptor, 3, 0);
  board.blueDispenser.addBalls(5);

  // Act
  let outcome = await board.blueCollector.putBall(TumblerBallColor.Blue);

  // Evaluate
  expect(outcome).toBe(TumblerResult.BlueBallIntercepted);
});

test("Ramp + Interceptor, triggered collector, interception", async () => {
  // Arrange
  let board = new TumblerBoard(boardNofColumns, boardNofRows);
  const facingLeft = true;
  board.setPart(TumblerPartType.Ramp, 3, 0, facingLeft);
  board.setPart(TumblerPartType.Interceptor, 2, 1);
  board.blueDispenser.addBalls(5);

  // Act
  let outcome = await board.blueCollector.putBall(TumblerBallColor.Blue);

  // Evaluate
  expect(outcome).toBe(TumblerResult.BlueBallIntercepted);
});

test("Ramp + Interceptor, triggered collector, interception", async () => {
  // Arrange
  let board = new TumblerBoard(boardNofColumns, boardNofRows);
  const facingLeft = false;
  board.setPart(TumblerPartType.Ramp, 7, 0, facingLeft);
  board.setPart(TumblerPartType.Interceptor, 8, 1);
  board.redDispenser.addBalls(5);

  // Act
  let outcome = await board.redCollector.putBall(TumblerBallColor.Blue);

  // Evaluate
  expect(outcome).toBe(TumblerResult.RedBallIntercepted);
});

test("Ramp facing right + Interceptor, triggered collector, ball dropped", async () => {
  // Arrange
  let board = new TumblerBoard(boardNofColumns, boardNofRows);
  const facingLeft = false;
  board.setPart(TumblerPartType.Ramp, 3, 0, facingLeft);
  board.setPart(TumblerPartType.Interceptor, 2, 1);
  board.blueDispenser.addBalls(5);

  // Act
  let outcome = await board.blueCollector.putBall(TumblerBallColor.Blue);

  // Evaluate
  expect(outcome).toBe(TumblerResult.BlueBallDropped);
});
