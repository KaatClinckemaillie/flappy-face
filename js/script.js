import Face from './classes/Face.js';
import Pipe from './classes/Pipe.js';


{
  let y;
  let face;
  let pipe;

  const checkHit = () => {
    if(face.x <  pipe.x + 30 && face.x + 30 > pipe.x) {
      if(face.y < 200 || face.y > 300){
        console.log('check');
        fill('red')
      }else {
        fill('green')
      }
    }else {
      fill('white')
    }

  }

  const init = () => {

    window.setup = () => {
      createCanvas(640,480);
      y = 200;
      //fill('red') 
      face = new Face(200, 200);
      pipe = new Pipe();
    }

    window.draw = () => {
      pipe.show();
      pipe.update();
      face.update();
      face.show();
      checkHit(face.x, pipe.x);       
    }

    window.keyPressed = () => {
      if(key === ' ') {
        face.up();
      }
    }
  }

  init()

} 

