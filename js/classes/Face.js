class Face {
  
  constructor(color, x, y) {
    this.y = y;
    this.x = x;

    this.color = color;

    this.gravity = 0.1;
    this.velocity = 0;
    this.lift = -12;
  }

  display() {
    strokeWeight(3);
    stroke(this.color);
    fill(this.color);
    rect(this.x, this.y, 20, 20)
  }

  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;
    
    
  }
}

export default Face