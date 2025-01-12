//import { World } from './world.js';
const origin = { x: 0, y: 0 };
const canvas = document.getElementById('game');
const canvasWidth = canvas.width;
const blockScale = 10;
const aspectRatio = 16 / 9;
const blockSize = canvasWidth / blockScale;
const ctx = canvas.getContext('2d');


const blockDetails_0_1 = {
    1: {
        name: 'stone',
        color: 'grey',
        solid: true,
    },
    2: {
        name: 'dirt',
        color: 'brown',
        solid: true,
    }
}

const chunk = {
    origin: { x: 0, y: 0 },
    data: [
    [0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
    [0, 2, 0, 0, 2, 0, 0, 2, 2, 2],
    [2, 2, 2, 2, 2, 1, 2, 2, 2, 2],
    [2, 2, 1, 2, 1, 2, 1, 1, 2, 2],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    
]}

let world;
let blockAsset;

function loadAssets(){
    blockAsset = blockDetails_0_1; // Will replace with actual asset loading
}

function setUp() {
    loadAssets();
    world = new World(ctx, 'world', origin, aspectRatio, blockSize, canvas.width, canvas.height, 0, blockAsset);
    world.addChunk(chunk);
    console.log(world.info());
   return
}

function start() {
    world.renderChunk(chunk);
    return
}

setUp();
start();
console.log('Game started');