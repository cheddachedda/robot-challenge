const reduceInput = (f) => f.trim().toUpperCase();

const validateInput = (x, y, f) => {
  const errors = {};

  // Validate X
  if (!Number.isInteger(x)) errors.x = 'invalid input';
  if (x < 0 || x > 4) errors.x = 'out of range';

  // Validate Y
  if (!Number.isInteger(y)) errors.y = 'invalid input';
  if (y < 0 || y > 4) errors.y = 'out of range';

  // Validate F
  const directions = ['NORTH', 'SOUTH', 'EAST', 'WEST'];
  if (!directions.includes(f)) errors.f = 'invalid input';

  const valid = Object.keys(errors).length === 0;

  return { valid, errors };
};

module.exports = { reduceInput, validateInput };