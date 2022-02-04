class Robot {
  constructor() {
    this.x = null;
    this.y = null;
    this.facing = null;
  }

  PLACE(x, y, f) {
    // TODO: validate input
    this.x = x;
    this.y = y;
    this.facing = f;
  }

  MOVE() {
    if (this.facing === 'NORTH' && this.y < 4) this.y++;
    if (this.facing === 'SOUTH' && this.y > 0) this.y--;
    if (this.facing === 'EAST' && this.x < 4) this.x++;
    if (this.facing === 'WEST' && this.x > 0) this.x--;
  }

  REPORT() {
    // Expects a PLACE command to have been called first
    if (!this.x && !this.y && !this.facing) {
      throw 'a PLACE command is required first'
    }
    return [this.x, this.y, this.facing];
  }
}

const validatePlaceInput = (x, y, f) => {

}

module.exports = Robot;