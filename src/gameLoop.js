//import { World } from './world.js';
const origin = { x: 0, y: 0 };
const canvas = document.getElementById('game');
const canvasWidth = canvas.width;
const chunkSizeX = 10;
const chunkSizeY = 400;
const blockScale = 0.5;
const aspectRatio = 16 / 9;
const blockSize = (canvasWidth / chunkSizeX) * blockScale;
const ctx = canvas.getContext('2d');
const xDirection = 1;
const yDirection = 1;
const renderDistance = 5;


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
        color: '#F5F5DC',
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

const generationMap_0_1 = {
    // Logic for Air blocks
    0: {
        yLevel: "airProbability", 
        blocks: {
            1: 5,   // stone
            2: 3,   // dirt
            3: -10, // power
            4: -20  // water
        },
        innateRarity:10 
    },
    1: {
        yLevel: "parabola", 
        blocks: {
            1: 5,   // stone
            2: 3,   // dirt
            3: -10, // power
            4: -20  // water
        },
        innateRarity: 8 
    },
    2: {
        yLevel: "linear", // Logic for dirt blocks
        blocks: {
            1: -5,  // stone
            2: 15,  // dirt
            3: -20, // power
            4: 5    // water
        },
        innateRarity: 6
    },
    3: {
        yLevel: "inverseSquare", // Logic for power blocks
        blocks: {
            1: -10, // stone
            2: -10, // dirt
            3: 20,  // power
            4: 0    // water
        },
        innateRarity: 1
    },
    4: {
        yLevel: "constant", // Logic for water blocks
        blocks: {
            1: -15, // stone
            2: 0,   // dirt
            3: 5,   // power
            4: 20   // water
        },
        innateRarity: 3
    }
};



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
let generationMap;
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
    'w': false,
    's': false,
    'a': false,
    'd': false
}

let states = {
    paused: false,
}

function pauseGame() {
    states.paused = !states.paused;
}


function initializeEventListeners() {
    //mouse move and click
    window.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    window.addEventListener('contextmenu', (e) => {
        const rect = canvas.getBoundingClientRect();
        const inCanvas = mouseX >= 0 && mouseX <= rect.width && mouseY >= 0 && mouseY <= rect.height;
        if (inCanvas) {
            e.preventDefault(); 
        }
    });

    window.addEventListener('mousedown', (e) => {
        e.preventDefault(); 
        if (e.button === 0) {
            world.deleteBlock(
                Math.max(0, Math.min(mouseX, canvas.width)),
                Math.max(0, Math.min(mouseY, canvas.height)),
                camera,
            );
        } else if (e.button === 2) {
            world.addBlock(
                Math.max(0, Math.min(mouseX, canvas.width)),
                Math.max(0, Math.min(mouseY, canvas.height)),
                camera,
                2
            );
        }
    });

    //key presses
    window.addEventListener('keydown', (e) => {
        console.log
        if (e.key === 'p') {
            pauseGame();
        }
        keys[e.key] = true;
    });


    window.addEventListener('keyup', (e) => {
        keys[e.key] = false;
    });

}

/*
const keyBindings = {
    "moveUp": cameraMove(),
    "moveDown": cameraMove(),
    "moveLeft": cameraMove(),
    "moveRight": cameraMove(),
    "deleteBlock": world.deleteBlock(),
    "addBlock": world.addBlock(),
}*/

function cameraMove() {
    if (keys['w']) {
        camera.changeY(yDirection);
    }
    if (keys['s']) {
        camera.changeY(-yDirection);
    }
    if (keys['a']) {
        camera.changeX(xDirection);
    }
    if (keys['d']) {
        camera.changeX(-xDirection);
    }
}

function cameraAcceleration(camera, keys) {
    if (keys.a || keys.d || keys.w || keys.s) {
        camera.speed += .05;
    } else { 
        camera.speed = baseCameraSpeed
    }
}


function loadAssets(){
    // Will replace with actual asset loading
    blockAsset = blockDetails_0_1; 
    generationMap = generationMap_0_1;
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
    if (chunkNumbers && !chunkNumbers.includes(currentChunk + 1)) {
        world.addChunk(world.generateChunk(currentChunk + 1));
    }
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
        generationMap_0_1
    );
    initializeEventListeners()
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
        "Mouse Chunk": world.objectPosOverChunk(mouseX, camera),
        "Mouse Pos over block": world.objectPosOverBlock(
            Math.max(0, Math.min(mouseX, canvas.width)), 
            Math.max(0, Math.min(mouseY, canvas.height)),
            camera
        ),
        "current Block index": world.currentBlock(mouseX, mouseY, camera),
        "current Block name": blockAsset[world.currentBlock(mouseX, mouseY, camera)]?.name
    });
    cameraAcceleration(camera, keys);

    renderChunksOnEnter(world.getLoadedChunkNumbers());
    if(!states.paused) requestAnimationFrame(start);
    return
}

setUp();
start();
console.log('Game started');
