const { reduceInput, validateInput } = require('./helpers/helpers');

class Robot {
  constructor() {
    this.x = null;
    this.y = null;
    this.facing = null;
  }

  PLACE(x, y, f) {
    // Trims whitespace from string and converts to uppercase before validation
    f = reduceInput(f);
    
    const { valid, errors } = validateInput(x, y, f);

    if (valid) {
      this.x = x;
      this.y = y;
      this.facing = f;
    } else {
      throw errors;
    }
  }

  MOVE() {
    if (this.facing === 'NORTH' && this.y < 4) this.y++;
    if (this.facing === 'SOUTH' && this.y > 0) this.y--;
    if (this.facing === 'EAST' && this.x < 4) this.x++;
    if (this.facing === 'WEST' && this.x > 0) this.x--;
  }

  LEFT() {
    if (this.facing === 'NORTH') this.facing = 'WEST';
    else if (this.facing === 'SOUTH') this.facing = 'EAST';
    else if (this.facing === 'EAST') this.facing = 'NORTH';
    else if (this.facing === 'WEST') this.facing = 'SOUTH';
  }

  RIGHT() {
    if (this.facing === 'NORTH') this.facing = 'EAST';
    else if (this.facing === 'SOUTH') this.facing = 'WEST';
    else if (this.facing === 'EAST') this.facing = 'SOUTH';
    else if (this.facing === 'WEST') this.facing = 'NORTH';
  }

  REPORT() {
    // Expects a PLACE command to have been called first
    if (!this.x && !this.y && !this.facing) {
      throw 'a PLACE command is required first'
    }
    return [this.x, this.y, this.facing];
  }
}

module.exports = Robot;