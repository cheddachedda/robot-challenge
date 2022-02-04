const Robot = require('./robot');

test('REPORT should return the robot\'s current position', () => {
  const robot = new Robot();
  robot.PLACE(0, 0, 'NORTH');

  const expected = [0, 0, 'NORTH'];
  const actual = robot.REPORT();

  expect(actual).toEqual(expected);
});

test('PLACE should be the first command', () => {
  const robot = new Robot();

  expect(() => {
    robot.REPORT();
  }).toThrowError();
});

test('MOVE should move the robot one unit north', () => {
  const robot = new Robot();
  robot.PLACE(0, 0, 'NORTH');
  robot.MOVE();

  const expected = [0, 1, 'NORTH'];
  const actual = robot.REPORT();

  expect(actual).toEqual(expected);
});