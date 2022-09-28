import Face from './classes/Face.js';
import Pipe from './classes/Pipe.js';


{
  let y;
  let face;
  const pipes = [];
  const canvasWidth = 1280;
  const canvasHeight = 600;
  let score = 0;
  let indexPipes = 0;
  let indexFace = 0;
  let paused = false;
  let img1, img2, img3;
  let pictureScore = false;
  let scoreText = 'score: 0';



  const photos = [];

  let socket, peerConnection;

  const $url = document.querySelector('.url')
  const $otherCamera = document.getElementById('otherCamera');
  const $canvas = document.querySelector('.canvas');
  const ctx = $canvas.getContext('2d');
  const $photos = document.querySelector('.photos');
  const $todo = document.querySelector('.todo');
  const $instructions = document.querySelector('.instructions');
  const $qr = document.getElementById('qr');
  let stateGame = 'initial' // initial - start - gameOver - score

  const servers = {
    iceServers: [{
      urls: `stun:stun.l.google.com:19302`
    }]
  };
  
  const addPipe = () => {
    if(indexPipes % 273 === 0){
      pipes.push(new Pipe());
    }
  }

  const checkScore = (pipe) => {
    if(pipe.score) {
      score ++;     
      scoreText = `score: ${score}`
      pictureScore = true;
    }
    if(pipe.gameOver){
      stateGame = 'gameOver'
      socket.emit('gameOver');
      //noLoop();
    }
  }


  const initSocket =  () => {

    socket = io.connect(`/`);
    socket.on(`connect`, () => {
      //console.log(`Connected: ${socket.id}`);
      const url = `${window.location}/controller.html?id=${socket.id}`
      $url.textContent = url;
      const typeNumber = 4;
      const errorCorrectionLevel = 'L';
      const qr = qrcode(typeNumber, errorCorrectionLevel);
      qr.addData(url);
      qr.make();
      $qr.innerHTML = qr.createImgTag(4);
    });

   
      socket.on('peerOffer', (myId, offer, peerId) => {
        console.log(`Received peerOffer from ${peerId}`);
        $qr.classList.add('hide');
        $url.classList.add('hide');
        
        $canvas.classList.remove('hide');
        answerPeerOffer(myId, offer, peerId);
        $todo.innerHTML = 'Take a picture of a happy face' 
      });
      socket.on('peerIce', async (myId, candidate, peerId) => {
        console.log(`Received peerIce from ${peerId}`, candidate);
        await handlePeerIce(myId, candidate, peerId);
      });
      socket.on('takePicture', async () => {
        console.log('take picture');
        console.log(photos.length)
        photos.push($canvas.toDataURL());

        if(photos.length === 1) {
          $todo.innerHTML = 'Take a picture of a neutral face'
        }
        if(photos.length === 2) {
          $todo.innerHTML = 'Take a picture of a sad face'
        }
        if(photos.length === 3) {
         
          console.log('stopvideo');
          socket.emit('stopVideo');
          $canvas.classList.add('hide');
          $todo.classList.add('hide');


          img1 = await loadImage(photos[0]);
          img2 = await loadImage(photos[1]);   
          img3 = await loadImage(photos[2]); 
          
          stateGame = 'start'   
          
        }
      })
      
    
    socket.on('start', () => {
      console.log('start')
      document.getElementById('qr').classList.add('hide');
      $url.classList.add('hide');
      $canvas.classList.remove('hide');

    })


    socket.on('pause', () => {
      paused = !paused;
    })
    socket.on(`click`, click => {
      face.up();
    })   

  }

  const answerPeerOffer = async (myId, offer, peerId) => {
    peerConnection = new RTCPeerConnection(servers);
    peerConnection.onicecandidate = (e) => {
      //console.log('ice candidate', e.candidate);
      socket.emit('peerIce', peerId, e.candidate);
    };
    peerConnection.ontrack = (e) => {
      //console.log('ontrack');
      $otherCamera.srcObject = e.streams[0];
    };
    await peerConnection.setRemoteDescription(offer);
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    socket.emit(`peerAnswer`, peerId, answer);
  };



  const handlePeerIce = async (myId, candidate, peerId) => {
      if (!candidate) {
        return;
      }
      await peerConnection.addIceCandidate(candidate);
  };

  const loopVideo = () => {
    ctx.drawImage($otherCamera, 0, 0);
    setTimeout(loopVideo, 1000 / 30); // drawing at 30fps
  }
  
  window.setup = () => {
    createCanvas(canvasWidth,canvasHeight);
    background('lightblue')
    y = 200;
    face = new Face(canvasWidth, canvasHeight);
    pipes.push(new Pipe());
  }
  window.draw = () => {
        
    if(stateGame == 'start' && img3 !== '' && !paused){
          console.log('start')
          clear();
          background('lightblue');
          noStroke();
          fill(255)
          text(scoreText, canvasWidth - 100 ,30)
          //loop pipes   
          indexPipes ++;     
          for(let i = 0; i <= pipes.length - 1; i++){
            pipes[i].show();
            pipes[i].update();
            pipes[i].checkHit(face);
            checkScore(pipes[i]);
          }
          addPipe();

          face.update();
          if(pictureScore){
            indexFace++;
            face.show(img1)
            if(indexFace % 73 === 0) {
              pictureScore = false;
              indexFace = 0;
            }
          }else {
            
            face.show(img2);
          }

      }  
    if(stateGame == 'gameOver') {
      clear();
      background('lightblue');
      fill(255);
      textAlign(CENTER);
      textSize(32);
      text('Game Over!', canvasWidth / 2, 500);
      textSize(24);
      text(scoreText, canvasWidth / 2 ,550)
      face.gameOver();
      face.show(img3);

    }
    if(stateGame == 'score') {
      face.show(img1)
    }

    }
    window.keyPressed = () => {
      if(key === 'p') {
        paused = !paused;
      }
  } 
  const init =  () => {
    initSocket();
    loopVideo(); 
  }

  init()

} 

