const { generateID, reduceInput, validateInput } = require('./helpers');

describe('generateID', () => {

  test('should produce a valid ID', () => {
    const id = generateID();
    const regex = /[A-Z]{2}\d{3}/;
  
    const expected = true;
    const actual = regex.test(id);
    expect(actual).toBe(expected);
  
    const expectedlength = 5;
    const actualLength = id.length;
    expect(actualLength).toBe(expectedlength);
  });

});

describe('reduceInput()', () => {

  test('should trim whitespace', () => {
    const tests = [
      ' INPUT ',
      '  INPUT',
      'INPUT  ',
      '\nINPUT  ',
      ' INPUT  \n',
    ];
  
    tests.forEach((test) => {
      const expected = 'INPUT';
      const actual = reduceInput(test);
      expect(actual).toBe(expected);
    });
  });
  
  test('should convert to uppercase', () => {
    const tests = [
      'input',
      'INPUT',
      'inPut',
      'Input'
    ];
  
    tests.forEach((test) => {
      const expected = 'INPUT';
      const actual = reduceInput(test);
      expect(actual).toBe(expected);
    });
  });

});

describe('validateInput()', () => {

  test('should return a valid boolean', () => {
    const expected = 'boolean';
    const actual = typeof validateInput(-1, 5, 0).valid;
  
    expect(actual).toEqual(expected);
  });
  
  test('should return an errors object', () => {
    const expected = 'object';
    const actual = typeof validateInput(-1, 5, 0).errors;
  
    expect(actual).toEqual(expected);
  });
  
  test('x should be a number between 0 and 4', () => {
    const tests = [
      { x: 0, valid: true },
      { x: 4, valid: true },
      { x: -1, valid: false },
      { x: 5, valid: false },
      { x: null, valid: false },
      { x: '2', valid: false },
      { x: 1.5, valid: false },
      { x: [1], valid: false },
    ];
  
    tests.forEach((test) => {
      const expected = test.valid;
      const actual = validateInput(test.x, 0, 'NORTH').valid;
      expect(actual).toBe(expected);
    });
  });
  
  test('y should be a number between 0 and 4', () => {
    const tests = [
      { y: 0, valid: true },
      { y: 4, valid: true },
      { y: -1, valid: false },
      { y: 5, valid: false },
      { y: null, valid: false },
      { y: '2', valid: false },
      { y: 1.5, valid: false },
      { y: [1], valid: false },
    ];
  
    tests.forEach((test) => {
      const expected = test.valid;
      const actual = validateInput(0, test.y, 'NORTH').valid;
      expect(actual).toBe(expected);
    });
  });
  
  test('f should be a valid cardinal direction', () => {
    const tests = [
      { f: 'NORTH', valid: true },
      { f: 'SOUTH', valid: true },
      { f: 'EAST', valid: true },
      { f: 'WEST', valid: true },
      { f: 'NORD', valid: false },
      { f: 'S', valid: false },
      { f: 'NORTHEAST', valid: false },
      { f: 'SOUTH WEST', valid: false },
      { f: 0, valid: false },
      { f: 'UP', valid: false },
      { f: true, valid: false },
    ];
  
    tests.forEach((test) => {
      const expected = test.valid;
      const actual = validateInput(0, 0, test.f).valid;
      expect(actual).toBe(expected);
    });
  });
  
});
