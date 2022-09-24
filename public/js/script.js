import Face from './classes/Face.js';
import Pipe from './classes/Pipe.js';


{
  let y;
  let face;
  const pipes = [];
  const canvasWidth = 640;
  const canvasHeight = 480;
  let score = 0;
  let index = 0;

  let socket;
  const $url = document.querySelector('.url');
  
  const addPipe = () => {
    if(index % 273 === 0){
      pipes.push(new Pipe());
    }
  }

  const checkScore = (pipe) => {
    if(pipe.score) {
      score ++;     
      console.log(`score: ${score}`);
    }
    if(pipe.gameOver){
      noLoop();
    }
  }

/*   const handleClick = e => {
    e.preventDefault();
    if(socket.connected) {
      socket.emit(`click`, 'yes!')
    }
  } */

  const init = () => {

    socket = io.connect(`/`);
    socket.on(`connect`, () => {
      console.log(`Connected: ${socket.id}`);
      //let url = `${new URL(`/controller.html?id=${socket.id}`, window.location)}`;
      const url = `${window.location}/controller.html?id=${socket.id}`
      $url.textContent = url;
    });

    socket.on(`update`, data => {
      console.log('update')

    })

    socket.on(`click`, click => {
      console.log(`clicked: ${click}`);
      face.up();
    })

    //window.addEventListener('click', e => handleClick(e))

    window.setup = () => {
      createCanvas(canvasWidth,canvasHeight);
      y = 200;
      face = new Face();
      pipes.push(new Pipe());
    }

    window.draw = () => {

      clear();
      face.update();
      face.show();
      //loop pipes
       
      index ++;     
      for(let i = 0; i <= pipes.length - 1; i++){
        pipes[i].show();
        pipes[i].update();
        pipes[i].checkHit(face);
        checkScore(pipes[i]);
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

