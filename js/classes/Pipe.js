class Pipe {
  constructor() {
    this.x = 500;

  }

  show() {
    rect(this.x, 0, 30, 200);
    rect(this.x, 300, 30, 180   );  
  }

  update() {
    this.x = this.x -1;

  }

  
}

export default Pipe 