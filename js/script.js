import Face from './classes/Face.js';
import Pipe from './classes/Pipe.js';


{
  let y;
  let face;
  const pipes = [];

  let index = 0;

  const checkHit = (pipe) => {
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
  
  const addPipe = () => {
    if(index % 273 === 0){
      pipes.push(new Pipe());
    }
  }

  const init = () => {

    window.setup = () => {
      createCanvas(640,480);
      y = 200;
      //fill('red') 
      face = new Face(200, 200);
      pipes.push(new Pipe());
    }

    window.draw = () => {

      face.update();
      face.show();
      //loop pipes
       
      index ++;     
      for(let i = 0; i <= pipes.length - 1; i++){
        pipes[i].show();
        pipes[i].update();
          checkHit(pipes[i]); 
      }

      addPipe();
    }

    window.keyPressed = () => {
      if(key === ' ') {
        face.up();
      }
    }
  }

  init()

} 

