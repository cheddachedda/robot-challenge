const { reduceInput, validateInput } = require('./helpers/helpers');

class Robot {
  constructor() {
    this.id = this.generateID();
    this.x = null;
    this.y = null;
    this.facing = null;
  }
  
  generateID() {
    const letter = () => String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    const num = () => Math.floor(Math.random() * 10);
    return [ letter(), letter(), num(), num(), num() ].join(''); ;
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
    const leftOf = {
      NORTH: 'WEST',
      SOUTH: 'EAST',
      EAST: 'NORTH',
      WEST: 'SOUTH'
    };

    this.facing = leftOf[this.facing];
  }

  RIGHT() {
    const rightOf = {
      NORTH: 'EAST',
      SOUTH: 'WEST',
      EAST: 'SOUTH',
      WEST: 'NORTH'
    };

    this.facing = rightOf[this.facing];
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