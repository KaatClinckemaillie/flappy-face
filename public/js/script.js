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

  let photo = ``;

  let socket, peerConnection;

  const $url = document.querySelector('.url');
  const $otherCamera = document.getElementById('otherCamera');
  const $canvas = document.querySelector('.canvas');
  const ctx = $canvas.getContext('2d');
  
  const servers = {
    iceServers: [{
      urls: `stun:stun.l.google.com:19302`
    }]
  };
  
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


  const initSocket = () => {

    socket = io.connect(`/`);
    socket.on(`connect`, () => {
      //console.log(`Connected: ${socket.id}`);
      const url = `${window.location}/controller.html?id=${socket.id}`
      $url.textContent = url;
    });
    if(!photo){
      socket.on('peerOffer', (myId, offer, peerId) => {
        //console.log(`Received peerOffer from ${peerId}`);
        answerPeerOffer(myId, offer, peerId);
      });
      socket.on('peerIce', async (myId, candidate, peerId) => {
        //console.log(`Received peerIce from ${peerId}`, candidate);
        await handlePeerIce(myId, candidate, peerId);
      });
    }else{
      socket.on(`click`, click => {
      face.up();
    })

    }
    
    

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

  const loop = () => {
    ctx.drawImage($otherCamera, 0, 0);
    setTimeout(loop, 1000 / 30); // drawing at 30fps
  }
  const init =  () => {
    initSocket();

    
    loop();

    if(!photo) {
      console.log('geen foto')
    }else{
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


  }

  init()

} 

