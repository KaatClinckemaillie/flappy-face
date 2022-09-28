class Face {
  
  constructor(canvasWidth, canvasHeight) {
    this.y = 200;
    this.x = 200;

    this.canvasHeight = canvasHeight;
    this.canvasWidth = canvasWidth;

    this.gravity = 0.1;
    this.velocity = 0;
    this.lift = -3; 
    this.size = 100;
    this.img = '';
      
  }

  show(img) {

      image(img, this.x, this.y, this.size, this.size)
    
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
  gameOver() {
    this.size = 300;
    this.x = this.canvasWidth / 2 - this.size/2;
    this.y = this.canvasHeight / 2 - this.size/2;
  }

  restart() {

  }
}

export default Face