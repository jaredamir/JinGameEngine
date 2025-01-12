// import { Block } from './block.js';
// import { Entity } from './entity.js';
// import { Player } from './player.js';


//export 
class World {
  constructor(
    canvas, 
    name, 
    origin, 
    aspectRatio, 
    blockSize, 
    canvasWidth, 
    canvasHeight,
    id,
    blockAsset,
) {
    console.log("World Initiated");
    this.name = name;
    this.canvas = canvas;
    this.loadedChunks = [];
    this.id = id;
    this.origin = origin;
    this.aspectRatio = aspectRatio;
    this.blockSize = blockSize;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.blockAsset = blockAsset;
  }

  info() {
    return {
      name: this.name,
      origin: this.origin,
      aspectRatio: this.aspectRatio,
      blockSize: this.blockSize,
      canvasWidth: this.canvasWidth,
      canvasHeight: this.canvasHeight,
      id: this.id,
    }
  }

  addChunk(chunk) {
    console.log("Chunk Added");
    this.loadedChunks.push(chunk);
  }

  renderChunk(chunk) {
    console.log("Chunk Rendered");
    const chunkOrigin = chunk.origin;
    const chunkData = chunk.data;
    for (let y = chunkOrigin.y; y < chunkData.length; y++) {
       for (let x = chunkOrigin.x; x < chunkData[y].length; x++) {
        if(chunkData[y][x] !== 0){
            const block = new Block(x * this.blockSize, y * this.blockSize, this.blockAsset[chunkData[y][x]]);
            block.render(this.canvas, this.blockSize);
        }
       }
      }
    }
}