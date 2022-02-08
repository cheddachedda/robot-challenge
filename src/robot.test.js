const Robot = require('./robot');

describe('.id', () => {

  test('should be a valid ID', () => {
    const robot = new Robot();
    const regex = /[A-Z]{2}\d{3}/;
  
    const expected = true;
    const actual = regex.test(robot.id);
    expect(actual).toBe(expected);
  
    const expectedlength = 5;
    const actualLength = robot.id.length;
    expect(actualLength).toBe(expectedlength);
  });
  
  test('should return the same ID when called repeatedly', () => {
    const robot = new Robot();
    expect(robot.id).toBe(robot.id);
    expect(robot.id).toBe(robot.id);
  });

});

describe('REPORT', () => {

  test('should return the robot\'s current position', () => {
    const robot = new Robot();
    robot.PLACE(0, 0, 'NORTH');
  
    const expected1 = [0, 0, 'NORTH'];
    const actual1 = robot.REPORT();
  
    expect(actual1).toEqual(expected1);

    robot.MOVE();

    const expected2 = [0, 1, 'NORTH'];
    const actual2 = robot.REPORT();
  
    expect(actual2).toEqual(expected2);
  });

});

describe('PLACE', () => {

  test('should be the first command', () => {
    const robot = new Robot();
  
    expect(() => {
      robot.REPORT();
    }).toThrowError();
  });

});

describe('MOVE', () => {

  test('should move the robot one unit in the direction it\'s facing', () => {
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
  
  test('should not allow the robot to fall off the table', () => {
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

});

describe('LEFT', () => {

  test('should turn the robot to the left', () => {
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

});

describe('RIGHT', () => {

  test('should turn the robot to the right', () => {
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