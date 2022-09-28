import {random} from '../functions/lib.js'

class Pipe {
  constructor(canvasHeight) {
    this.x = width ;

    this.space = 250;
    this.stop = random(50, 300);

    this.canvasHeight = 600;
    
    this.gameOver = false;
    this.score = false;
  }

  show() {
    fill('#4cbb17')
    rect(this.x, 0, 60, this.stop);
    rect(this.x, this.stop + this.space, 60, this.canvasHeight - (this.stop + this.space));  
  }

  update() {
    this.x = this.x -2;

  }

  checkHit(face) {
    
    if(face.x <  this.x + 60 && face.x > this.x + 40) {
      if(face.y + 100 > this.stop + this.space || face.y < this.stop){
        fill('red');
        this.gameOver = true;
      }
    } else if(face.x === this.x + 40){
        this.score = true;
    } else {
      fill('white');
      this.score = false;
    }

    } 
  }

  


export default Pipe 