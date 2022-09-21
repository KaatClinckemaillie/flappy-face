import Face from './classes/Face.js';


{



  
  const init = () => {
    let face;
    window.setup = () => {
      createCanvas(400,400);
      face = new Face('red',width/2, height/2);
    }

    window.draw = () => {
      face.display();
      face.update();
      
    }

  }

  init();
}

