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
    chunkSize
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
    this.chunkSize = chunkSize;
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

  renderBackground(color) {
    ctx.fillStyle = color; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  renderWorld(offsetX=0, offsetY=0) {
    for (let i = 0; i < this.loadedChunks.length; i++) {
        this.renderChunk(this.loadedChunks[i], offsetX+(i*this.chunkSize*this.blockSize), offsetY/*+(i*this.chunkSize*this.blockSize)*/);
    }
  }
  generateChunk(chunkOrigin) {
    const chunkData = []; 
    console.log("chunk size", this.chunkSize);
    for (let y = 0; y < this.chunkSize; y++) {
        let row = [];
        for (let x = 0; x < this.chunkSize; x++) { 
            row.push(Math.floor(Math.random()*5)) //need to replace with actual block generation
        }
        chunkData.push(row);
    }
    console.log("ChunkData", chunkData);
    return {
        origin: chunkOrigin,
        data: chunkData,
        interactedItems: {}
    }
  }

  renderChunk(chunk, offsetX=0, offsetY=0) {
    const chunkOrigin = chunk.origin;
    const chunkData = chunk.data;
    for (let y = chunkOrigin.y; y < chunkData.length; y++) {
       for (let x = chunkOrigin.x; x < chunkData[y].length; x++) {
        if(`${x},${y}` in chunk.interactedItems && chunk.interactedItems[`${x},${y}`].block !== 0){
            //cached items
            const block = new Block(
                (x * this.blockSize) + offsetX, 
                (y * this.blockSize) + offsetY, 
                this.blockAsset[chunk.interactedItems[`${x},${y}`].block]
            );
            block.render(this.canvas, this.blockSize);
        }else {
            //none cached items from regular chunk data
            if(chunkData[y][x] !== 0){
                const block = new Block(
                    (x * this.blockSize) + offsetX, 
                    (y * this.blockSize) + offsetY, 
                    this.blockAsset[chunkData[y][x]]
                );
                block.render(this.canvas, this.blockSize);
            }
        }
       }
      }
    }
}