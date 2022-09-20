import Face from './classes/Face.js';


{

  const FaceImg = new Face('red', 10, 10);

  const init = () => {
    window.setup = () => {
      createCanvas(400,400);
      FaceImg.draw();
    }

    window.draw = () => {
      
      FaceImg.update()
    }

  }

  init();
}

