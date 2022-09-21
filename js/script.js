import Face from './classes/Face.js';


{
  let y;
  let face;

  const init = () => {

    window.setup = () => {
      createCanvas(400,400);
      y = 200;
      //fill('red') 
      face = new Face('red', 100, 100)
    }

    window.draw = () => {
      face.show();
      //rect(100, y, 20, 20)
      
      //y = y + 1;
      face.update()
    }
  }

  init()

}