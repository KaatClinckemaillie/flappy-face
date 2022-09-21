class Face {
  
  constructor(x, y) {
    this.y = y;
    this.x = x;



    this.gravity = 0.1;
    this.velocity = 0;
    this.lift = -5; 
      
  }

  show() {

    rect(this.x, this.y, 30, 30)

  }

  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;

    if(this.y > 400) {
      this.y = 400;
      this.velocity = 0; 
    }
    if(this.y < 80) {
      this.y = 80;
      this.velocity = 0;
    }
  } 

  up() {
    this.velocity += this.lift;
    console.log(this.y)
  }
  hit() {
    fill('red')
  }

}

export default Face