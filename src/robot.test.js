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

test('MOVE should move the robot one unit in the direction it\'s facing', () => {
  const tests = [
    { origin: [0, 0, 'NORTH'], expected: [0, 1, 'NORTH'] },
    { origin: [0, 4, 'SOUTH'], expected: [0, 3, 'SOUTH'] },
    { origin: [0, 0, 'EAST'], expected: [1, 0, 'EAST'] },
    { origin: [4, 0, 'WEST'], expected: [3, 0, 'WEST'] },
  ];

  tests.forEach((test) => {
    const robot = new Robot();
    robot.PLACE(...test.origin);
    robot.MOVE();

    const expected = test.expected;
    const actual = robot.REPORT();

    expect(actual).toEqual(expected);
  });
});

test('MOVE should not allow the robot to fall off the table', () => {
  const tests = [
    [0, 4, 'NORTH'],
    [0, 0, 'SOUTH'],
    [4, 0, 'EAST'],
    [0, 0, 'WEST'],
  ];

  tests.forEach((test) => {
    const robot = new Robot();
    robot.PLACE(...test);
    robot.MOVE();

    const expected = test;
    const actual = robot.REPORT();

    expect(actual).toEqual(expected);
  });
});

test('LEFT should turn the robot to the left', () => {
  const tests = [
    { origin: 'NORTH', expected: 'WEST' },
    { origin: 'SOUTH', expected: 'EAST' },
    { origin: 'EAST', expected: 'NORTH' },
    { origin: 'WEST', expected: 'SOUTH' },
  ];

  tests.forEach((test) => {
    const robot = new Robot();

    robot.PLACE(0, 0, test.origin);
    robot.LEFT();

    const expected = [0, 0, test.expected];
    const actual = robot.REPORT();

    expect(actual).toEqual(expected);
  });
});

test('RIGHT should turn the robot to the right', () => {
  const tests = [
    { origin: 'NORTH', expected: 'EAST' },
    { origin: 'SOUTH', expected: 'WEST' },
    { origin: 'EAST', expected: 'SOUTH' },
    { origin: 'WEST', expected: 'NORTH' },
  ];

  tests.forEach((test) => {
    const robot = new Robot();

    robot.PLACE(0, 0, test.origin);
    robot.RIGHT();

    const expected = [0, 0, test.expected];
    const actual = robot.REPORT();

    expect(actual).toEqual(expected);
  });
});

test('Should pass CONSTRAINT #1', () => {
  const robot = new Robot();
  robot.PLACE(0, 0, 'NORTH');
  robot.MOVE();

  const expected = [0, 1, 'NORTH'];
  const actual = robot.REPORT();

  expect(actual).toEqual(expected);
});

test('Should pass CONSTRAINT #2', () => {
  const robot = new Robot();
  robot.PLACE(0, 0, 'NORTH');
  robot.LEFT();

  const expected = [0, 0, 'WEST'];
  const actual = robot.REPORT();

  expect(actual).toEqual(expected);
});

test('Should pass CONSTRAINT #3', () => {
  const robot = new Robot();
  robot.PLACE(1, 2, 'EAST');
  robot.MOVE();
  robot.MOVE();
  robot.LEFT();
  robot.MOVE();

  const expected = [3, 3, 'NORTH'];
  const actual = robot.REPORT();

  expect(actual).toEqual(expected);
});