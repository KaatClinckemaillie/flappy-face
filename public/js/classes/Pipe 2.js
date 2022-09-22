import {random} from '../functions/lib.js'

class Pipe {
  constructor(canvasHeight) {
    this.x = width ;

    this.space = 150;
    this.stop = random(50, 300);

    this.canvasHeight = 480;
    
    this.gameOver = false;
    this.score = false;
  }

  show() {
    rect(this.x, 0, 30, this.stop);
    rect(this.x, this.stop + this.space, 30, this.canvasHeight - (this.stop + this.space));  
  }

  update() {
    this.x = this.x -1;

  }

  checkHit(face) {
    if(face.x <  this.x + 30 && face.x + 30 > this.x) {
      console.log('check1')
      if(face.y > this.stop + this.space || face.y < this.stop){
        fill('red');
        this.gameOver = true;
      }else   {
        fill('red');
      }
    } else if(face.x === this.x + 30){
        this.score = true;
    } else {
      fill('white');
      this.score = false;
    } 

    }   
  }

  


export default Pipe 