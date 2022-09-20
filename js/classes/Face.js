class Face {
  constructor(color, x, y) {
    this.position = new p5.Vector(x, y)
    this.color = color;
    //this.velocity = new p5.Vector(0, 0.1);
  }

  draw() {
    strokeWeight(3);
    stroke(this.color);
    fill(this.color);
    rect(this.position.x, this.position.y, 20, 20)
  }

  update() {
    this.position.add(this.velocity);
  }
}

export default Face