class Face {
  
  constructor() {
    this.y = 200;
    this.x = 200;

    this.canvasHeight = 480;

    this.gravity = 0.1;
    this.velocity = 0;
    this.lift = -3; 
    this.size = 30;
      
  }

  show() {

    rect(this.x, this.y, this.size, this.size)

  }

  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;

    if(this.y > this.canvasHeight - this.size) {
      this.y = this.canvasHeight - this.size;
      this.velocity = 0; 
    }
    if(this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  } 

  up() {
    this.velocity += this.lift;
  }
  hit() {
    fill('red')
  }

}

export default Face