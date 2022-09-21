import {random} from '../functions/lib.js'

class Pipe {
  constructor() {
    this.x = width ;
    this.space = 150;
    this.stop = random(50, 300)

  }

  show() {
    rect(this.x, 0, 30, this.stop);
    rect(this.x, this.stop + this.space, 30, 480 - (this.stop + this.space));  
  }

  update() {
    this.x = this.x -1;

  }

  
}

export default Pipe 