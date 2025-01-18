//import { World } from './world.js';
const origin = { x: 0, y: 0 };
const canvas = document.getElementById('game');
const canvasWidth = canvas.width;
const chunkSizeX = 10;
const chunkSizeY = 400;
const blockScale = 1;
const aspectRatio = 16 / 9;
const blockSize = (canvasWidth / chunkSizeX) * blockScale;
const ctx = canvas.getContext('2d');
const xDirection = 1;
const yDirection = 1;
const renderDistance = 4;


const debugInfo = document.getElementById('debugInfo');



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
    chunkNumber: 0,
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

let paused = false;
let world;
let debuggerInstance;
let blockAsset;
let offsetX = 0;
let offsetY = 0;
let baseCameraSpeed = 20;
let cameraSpeed = baseCameraSpeed;
let camera;
let mouseX;
let mouseY;

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


window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
});

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

function cameraAcceleration(camera, keys) {
    if (keys.ArrowLeft || keys.ArrowRight || keys.ArrowUp || keys.ArrowDown) {
        camera.speed += .05;
    } else { 
        camera.speed = baseCameraSpeed
    }
}


function loadAssets(){
    blockAsset = blockDetails_0_1; // Will replace with actual asset loading
}


function addDebugInfo(infoObject) {
    debugInfo.innerHTML = Object.entries(infoObject)
        .map(([key, value]) => `${key}: ${value}`)
        .join('<br>');
}

function renderChunksOnEnter(chunkNumbers) {
    //if the current chunk is not in the loaded chunks then generate and add a new chunk
    currentChunk = Math.floor((Math.floor((camera.x)/ blockSize) * -1)/ chunkSizeX);
    if (chunkNumbers && !chunkNumbers.includes(currentChunk)) {
        world.addChunk(world.generateChunk(currentChunk));
    };
};


function setUp() {
    loadAssets();
    camera = new Camera(0, 0, cameraSpeed);
    world = new World(
        ctx, 
        'First World', 
        origin, 
        aspectRatio, 
        blockSize, 
        canvas.width, 
        canvas.height, 
        0, 
        blockAsset, 
        chunkSizeX, 
        chunkSizeY,
        renderDistance,
    );
    debuggerInstance = new Debugger();
    //world.addChunk(chunk);
    //debuggerInstance.add({"test": "test"});
   return
}
function start() {
    world.renderBackground("lightblue");
    world.renderWorld(camera.x, camera.y)
    cameraMove();
    addDebugInfo({
        "gameRunning": !paused,
        "cameraX": camera.x,
        "cameraY": camera.y,
        "MouseX": Math.max(0, Math.min(mouseX, canvas.width)),
        "MouseY": Math.max(0, Math.min(mouseY, canvas.height)),
        "CurrentChunk": Math.floor((Math.floor((camera.x)/ blockSize) * -1)/ chunkSizeX),
        "Loaded Chunk Numbers": world.getLoadedChunkNumbers(),
        "Camera Speed": camera.speed,
        "Mouse Chunk": world.mousePosOverChunk(mouseX, camera),
        "Mouse Pos over block": world.mousePosOverBlock(
            Math.max(0, Math.min(mouseX, canvas.width)), 
            Math.max(0, Math.min(mouseY, canvas.height)),
            camera
        ),
        "current Block index": world.currentBlock(mouseX, mouseY, camera),
        "current Block name": blockAsset[world.currentBlock(mouseX, mouseY, camera)]?.name
    });
    cameraAcceleration(camera, keys);

    renderChunksOnEnter(world.getLoadedChunkNumbers());
    console.log("loop");
    if(!states.paused) requestAnimationFrame(start);
    return
}

setUp();
start();
console.log('Game started');
