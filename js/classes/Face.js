class Face {
  
  constructor(color, x, y) {
    this.y = y;
    this.x = x;

    this.color = color;

    this.gravity = 1;

    this.lift = -12;
  }

  show() {
    fill(this.color);
    rect(this.x, this.y, 20, 20)
  }

  update() {

    if(this.y < 250) {
      this.y = this.y + this.gravity;
      //this.y = y;
      console.log(this.y)
    }    
  } 


}

export default Face