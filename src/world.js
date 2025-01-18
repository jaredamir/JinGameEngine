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
    chunkSizeX,
    chunkSizeY,
    renderDistance, 
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
    this.chunkSizeX = chunkSizeX;
    this.chunkSizeY = chunkSizeY;
    this.renderDistance = renderDistance;
  }
  //DATA
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
    if (this.loadedChunks.length > 0 ) {
      //if there is a chunk and the chunk is less than the first one in the array, add to the beginning, else, add to the end
      if(chunk.chunkNumber < this.loadedChunks[0].chunkNumber) {
        this.loadedChunks.unshift(chunk);
        if(this.loadedChunks.length > this.renderDistance) {
          //keep the loaded chunks to a minimum by removing from the end after adding to the beginning
          this.loadedChunks.pop()
        }
        console.log("Chunk Added to beginning");
        return
      } 
    } 
    this.loadedChunks.push(chunk);
    if(this.loadedChunks.length > this.renderDistance) {
      //keep the loaded chunks to a minimum by removing from the beginning after adding to the end
      this.loadedChunks.shift()
    }
    console.log("Chunk Added to end");
    return
  }

  getLoadedChunkNumbers() {
    return this.loadedChunks.map(chunk => {
      if (chunk.chunkNumber != null) return chunk.chunkNumber
      return;
    });
  }

  objectPosOverChunk(objectX, camera) {
    return Math.floor((camera.x - objectX) / (this.chunkSizeX * this.blockSize)*-1)
  }
  objectPosOverBlock(objectX, objectY, camera) {
    const worldX = (objectX / this.blockSize) - (camera.x / this.blockSize);
    const worldY = (objectY / this.blockSize) - (camera.y / this.blockSize);

    const blockX = Math.floor(worldX);
    const blockY = Math.floor(worldY);

    const blockInChunkX = ((blockX % this.chunkSizeX) + this.chunkSizeX) % this.chunkSizeX;

    return [blockInChunkX, blockY]
  }
  currentBlock(objectX, objectY, camera) {
    try {
      const objectChunk = this.objectPosOverChunk(objectX, camera);
      const indexes = this.objectPosOverBlock(objectX, objectY, camera);
      const x = indexes[0];
      const y = indexes[1];
      const index = this.loadedChunks.findIndex(chunk => chunk.chunkNumber === objectChunk);
      return this.loadedChunks[index].data[y][x]
    } catch (e) {
      console.log(e)
      return "could not find"
    }
  }

  //RENDERING

  renderBackground(color) {
    ctx.fillStyle = color; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  renderWorld(offsetX=0, offsetY=0) {
    for (let i = 0; i < this.loadedChunks.length; i++) {
        this.renderChunk(this.loadedChunks[i], offsetX+(this.loadedChunks[i].chunkNumber*this.chunkSizeX*this.blockSize), offsetY);
    }
  }
  generateChunk(chunkNumber) {
    const chunkData = []; 
    for (let y = 0; y < this.chunkSizeY; y++) {
        let row = [];
        for (let x = 0; x < this.chunkSizeX; x++) { 
            row.push(Math.floor(Math.random()*5)) //need to replace with actual block generation
        }
        chunkData.push(row);
    }
    return {
        chunkNumber: chunkNumber,
        data: chunkData,
        interactedItems: {}
    }
  } 
  deleteBlock(objectX, objectY, camera){
    try {
      const objectChunk = this.objectPosOverChunk(objectX, camera);
      const indexes = this.objectPosOverBlock(objectX, objectY, camera);
      const x = indexes[0];
      const y = indexes[1];
      const index = this.loadedChunks.findIndex(chunk => chunk.chunkNumber === objectChunk);
      this.loadedChunks[index].data[y][x] = 0;
      return
    } catch (e) {
      console.log(e)
      return "could not find"
    }
  }

  addBlock(objectX, objectY, camera, selectedBlockIndex){
    try {
      const objectChunk = this.objectPosOverChunk(objectX, camera);
      const indexes = this.objectPosOverBlock(objectX, objectY, camera);
      const x = indexes[0];
      const y = indexes[1];
      const index = this.loadedChunks.findIndex(chunk => chunk.chunkNumber === objectChunk);
      if (this.loadedChunks[index].data[y][x] == 0){
        this.loadedChunks[index].data[y][x] = selectedBlockIndex;
      }
      return
    } catch (e) {
      console.log(e)
      return "could not find"
    }
  }

  renderChunk(chunk, offsetX=0, offsetY=0) {
    const chunkNumber = chunk.chunkNumber;
    const chunkData = chunk.data;
    for (let y = 0; y < chunkData.length; y++) {
       for (let x = 0; x < chunkData[y].length; x++) {
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