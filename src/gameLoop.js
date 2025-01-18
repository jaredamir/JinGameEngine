//import { World } from './world.js';
const origin = { x: 0, y: 0 };
const canvas = document.getElementById('game');
const canvasWidth = canvas.width;
const chunkSize = 10;
const blockScale = 1;
const aspectRatio = 16 / 9;
const blockSize = (canvasWidth / chunkSize) * blockScale;
const ctx = canvas.getContext('2d');
const xDirection = 1;
const yDirection = 1;
let paused = false;
/*
{
camera: {
},
loadedAssets: {

},
spawnedEntities: [
player: {},
etc
],
loadedChunks: [
chunk: {
  interactedItems: [  {x: 0, y: 0, item: {}}, {x: 0, y: 0, item: {}} ],
}
],
world: { },



*/


const blockDetails_0_1 = {
    1: {
        name: 'stone',
        color: 'darkgrey',
        heathCapacity: 10,
        solid: true,
    },
    2: {
        name: 'dirt',
        color: 'grey',
        heathCapacity: 2,
        solid: true,
    },
    3: {
        name: 'power',
        color: 'purple',
        heathCapacity: 15,
        solid: true,
    },
    4: {
        name: 'water',
        color: 'blue',
        heathCapacity: 5,
        solid: false,
    }
}

const chunk = {
    origin: { x: 0, y: 0 },
    data: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
    [0, 2, 0, 0, 2, 0, 0, 2, 2, 2],
    [2, 2, 2, 2, 2, 1, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 1, 2, 2, 2, 2],
    [2, 2, 1, 2, 1, 2, 1, 1, 2, 2],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    interactedItems: {
        "3,4": { block: 3, objectData: {} },
        "5,4": { block: 4, objectData: {} },
    }
}

let world;
let blockAsset;
let offsetX = 0;
let offsetY = 0;
let cameraSpeed = 20;
let camera;

class Camera {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
    }
    changeX(direction) {
        this.x += direction * this.speed;
    }
    changeY(direction) {
        this.y += direction * this.speed;
    }
}
//Controls
let keys = {
    'ArrowUp': false,
    'ArrowDown': false,
    'ArrowLeft': false,
    'ArrowRight': false
}

let states = {
    paused: false,
}

function pauseGame() {
    states.paused = !states.paused;
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'p') {
        pauseGame();
    }
    keys[e.key] = true;
});


window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

function cameraMove() {
    if (keys['ArrowUp']) {
        camera.changeY(yDirection);
    }
    if (keys['ArrowDown']) {
        camera.changeY(-yDirection);
    }
    if (keys['ArrowLeft']) {
        camera.changeX(xDirection);
    }
    if (keys['ArrowRight']) {
        camera.changeX(-xDirection);
    }
}


function loadAssets(){
    blockAsset = blockDetails_0_1; // Will replace with actual asset loading
}

let generateChunk;
function setUp() {
    loadAssets();
    camera = new Camera(0, 0, cameraSpeed);
    world = new World(ctx, 'world', origin, aspectRatio, blockSize, canvas.width, canvas.height, 0, blockAsset, chunkSize);
    geratedChunk = world.generateChunk({ x: 0, y: 0 });
    world.addChunk(chunk);
    world.addChunk(geratedChunk);
    
    console.log(world.info());
   return
}

function start() {
    world.renderBackground();
    //world.renderChunk(geratedChunk, camera.x, camera.y);
    world.renderWorld(camera.x, camera.y)
    cameraMove();
    console.log("loop");
    if(!states.paused) requestAnimationFrame(start);
    return
}

setUp();
start();
console.log('Game started');
