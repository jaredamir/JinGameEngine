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
    generationMap, 
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
    this.generationMap = generationMap
    this.variableGenerationFunctions = {
      parabola: (y) => y ** 2,
      linear: (y) => y,
      inverseSquare: (y) => y !== 0 ? 1 / (y ** 2) : 0,
      constant: (y) => 1,
      airProbability: (y) => Math.exp(-y / 5)
  };
    this.rays = [];
    this.entities = [];
  }
  //***DATA***
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
  //***CHUNKS***/
  generateChunk(chunkNumber) {
    const chunkData = []; 
    let prevRow = null;
    for (let y = 0; y < this.chunkSizeY; y++) {
        let row = [];
        for (let x = 0; x < this.chunkSizeX; x++) { 
          //collect the neighbors of the current blocks **TODO: get neighboring blocks in other chunks**
            let blockNeighbors = [];
            if(x != 0) {blockNeighbors.push(row[x-1])}; //push left
            if(prevRow) { 
              if(x != 0) {blockNeighbors.push(prevRow[x-1])}; //push top left
              blockNeighbors.push(prevRow[x]) //push top
              if(x != this.chunkSizeX) {blockNeighbors.push(prevRow[x+1])}; //push top right
            }
            //add generated block using weighted generation
            row.push(this.getWeightedRandomBlock(y, blockNeighbors));
        }
        chunkData.push(row);
        //store row as previous row
        prevRow = row;
    }
    return {
        chunkNumber: chunkNumber,
        data: chunkData,
        interactedItems: {}
    }
  } 
  getBlockWeight(block, current_y_level, neighbors){
    let weight = this.generationMap[block].innateRarity;
    let yFunction = this.variableGenerationFunctions[this.generationMap[block].yLevel];
    weight += Math.ceil(yFunction(current_y_level));
    for (let neighboringBlock of neighbors) {
      //if the block we're looking at is affected by the specific neighbor block
      if(Object.keys(this.generationMap[block]?.blocks).includes(neighboringBlock?.toString())){
        weight+= parseInt(this.generationMap[block].blocks[neighboringBlock.toString()]);
      }
    };
    //constrain it to a max of 100 chance and avoid returning a negative
    return weight > 0 ? Math.min(weight, 100) : 0; 
  }

  getWeightedRandomBlock(y_level, neighbors){
    let weights = []
    //push the weight of each block into the weights array using the get weight function
    for (let block of Object.keys(this.generationMap)) {
      weights.push(this.getBlockWeight(block, y_level, neighbors));
    }
    //get the total and choose a random number between 0 and that sum
    let weightsTotal = weights.reduce((total, weight) => total + weight, 0);
    
    let randomInt = Math.floor(Math.random() * weightsTotal + 1);
    //keep subtracting the weight of each until it hits zero, which ever index it is on is the chosen index
    let index = 0;
    while (randomInt > 0) {
      randomInt -= weights[index]
      if (randomInt > 0) {index += 1};
    }
    return index;
  }
  //neighbor blocks, y level, innate rarity, 
  /*
{
  4: {
        yLevel: (y) => x**2,  // dynamic factor: based on y-level
        blocks: {
            1: 3,
            4: -3,
            0: -10
        },
        innateRarity: 1  
    },
    0: {
        yLevel: (y) => 0.5 * x ** -2,  
        blocks: {
            1: 5,
            4: -10,
            0: 5
        },
        innateRarity: 5  
    }
};
        //find a way to make this object more scalable like a 2d matrix of items to show relationships
        
        y-level,         innaterarity,       0,              1,             2 ,   
0.     (y) => x**2        (y) => 10       (y) => 15         (y) => 5    (y) => -3
1.      .....
2
3

    ** sum the results of each component to get the total chance (y_level answer + blocks + innate rarity)
    ** Space inefficent method, add block number to array based on total chance (ex. air:  y_level answer + blocks + innate rarity = 15) => [0,0,0...15times] do that with all and then pick a number between 0 and len [] -1
    ** efficent method: make an array of each ints probability, pick a random number between 0 and the sum of the array, subtract one from the number as many times as that index says

  */

  /*
    Generation post processing:
    -BFS cave making
    -BFS liquid making
  */
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
      //console.log(e)
      return "could not find"
    }
  }
  currentEntity(objectX, objectY, camera) {
    try {
      const relativeX = objectX - camera.x 
      const relativeY = objectY - camera.y 
      console.log(relativeX, relativeY)
      for (let entity of this.entities){
        if (relativeX >= entity.x 
            && relativeX <= entity.x + entity.width
            && relativeY >= entity.y 
            && relativeY <= entity.y + entity.height
          ){

          return entity
        }
      }
      return null;
    } catch (e) {
      console.log(e)
      return "could not find"
    }
  }

  //***RAYCASTING***/
  addRay(starting_x, starting_y, rotation){
    this.rays.push({
      starting_x: starting_x,
      starting_y: starting_y, 
      rotation: rotation,
    })
  }
  //***Entities***/
  addPlayer(x, y, name, inventory, speed, healthCapacity, regenerationRate, health, width, height){
    const player = new Player(x, y, name, inventory, speed, healthCapacity, regenerationRate, health, width, height)
    this.entities.push(player);
    console.log(player, this.entities)
  }

  //***RENDERING***/
  renderBackground(color) {
    ctx.fillStyle = color; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  renderWorld(offsetX=0, offsetY=0) {
    for (let i = 0; i < this.loadedChunks.length; i++) {
      this.renderChunk(this.loadedChunks[i], offsetX+(this.loadedChunks[i].chunkNumber*this.chunkSizeX*this.blockSize), offsetY);
    };
    this.entities.forEach((entity) => {
      try{
        entity.render(this.canvas, offsetX, offsetY); 
      } catch (e) {
        console.error(e);
      }
    })
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
  isColliding(points, camera) {
    //points [x,y]
    if (points[0] <= 0 || points[0] >= this.canvasWidth || points[1] <= 0 || points[1] >= this.canvasHeight ) {
      return true;
    }
    if (this.currentBlock(points[0], points[1], camera) == 0) {
      return false
    }
    return true
  }

  renderRay2(ray, degrees = true, camera) {
    if (this.isColliding([ray.starting_x, ray.starting_y], camera)) {return }
    let angle = 0;
    if(degrees){
      angle = ray.rotation * (Math.PI / 180); //turn to radians
    } else {
      angle = ray.rotation;
    }
    /*go block by block and check if something is in that area*/

    /*
    1. determine where in the world the starting position is in
    2. 
    */

  }
  renderRay(ray, degrees = true) {
    let angle = 0;
    if(degrees){
      angle = ray.rotation * (Math.PI / 180); //turn to radians
    } else {
      angle = ray.rotation;
    }
    /*
    let ref_length_x = this.canvasWidth - ray.starting_x; //get the ref line which goes from point to the right edge horizontally
    let tan_y_height = Math.tan(angle) * ref_length_x; // get the height using tan:  (opposite / adjacent) * adjacent
    let ref_length_y = Math.min(ray.starting_y, tan_y_height) //constrain the height
    let tan_x_length = (1 / Math.tan(angle)) * ref_length_y; // if y is constrained, get the new x using cotan:  (adjacent / opposite) * opposite

    let final_x = Math.min(ray.starting_x + tan_x_length , this.canvasWidth)
    let final_y = Math.max(0, ray.starting_y - tan_y_height);
    */
    let ref_length_x = this.canvasWidth - ray.starting_x; //get the ref line which goes from point to the right edge horizontally
    let y_height = Math.tan(angle) * ref_length_x
    let final_y = Math.min(this.canvasHeight, Math.max(0, (ray.starting_y - y_height)))
    let x_width = (1 / Math.tan(angle) * (ray.starting_y - final_y))
    let final_x = Math.min(this.canvasWidth, Math.max(0, ray.starting_x + x_width))

    this.canvas.strokeStyle = "yellow";
    this.canvas.lineWidth = 3;
    this.canvas.beginPath();
    this.canvas.moveTo(ray.starting_x, ray.starting_y)
    this.canvas.lineTo(final_x, final_y)
    this.canvas.stroke();

    this.canvas.fillStyle = "red";
    this.canvas.fillRect(final_x - 5, final_y - 5, 10, 10);


    /*
    x, y 
    ref length =  line from starting point to the right edge of the screen
      /|
     / | opposite
    /*_|
    ref (adjacent)
   
    opposite should equal tan(angle) * ref (adjacent)
    */
  }
  renderRayCasts(){
    for (let ray of this.rays) {
      this.renderRay(ray);
    }
  }
}