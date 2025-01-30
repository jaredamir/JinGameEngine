//export 
class Entity {
  constructor(x, y, name, healthCapacity, regenerationRate, width, height, currentChunk) {
    this.width = width;
    this.height = height;
    this.id = Math.random();
    this.x = x;
    this.y = y;
    this.name = name;
    this.healthCapacity = healthCapacity;
    this.health = healthCapacity;
    this.regenerationRate = regenerationRate;
    this.currentChunk = currentChunk;
  }
  
  info() {
    return {
        id: this.id,
        x: this.x,
        y: this.y,
        name: this.name,
        health: this.health,
        healthCapacity: this.healthCapacity,
    }
  }

  createRayPoints(){
    //const numberOfPointsHeight = Math.floor(this.height / this.blockSize) + 1;
    //const numberOfPointWidth = Math.floor(this.width / this.blockSize) + 1;
    //
    //(pointNumber * this.height) / (numberOfPointsHeight - 1) //Do for left side and right side
    //(pointNumber * this.width) / (numberOfPointWidth - 1) //Do for top and bottom
    return
  }

  damage(amount) {
    if (this.health - amount <= 0) {
        this.health -= amount;
    } else {
        this.health = 0;
    }
  }
  
  render(canvas, offsetX, offsetY) {
    canvas.fillStyle = "red";
    canvas.fillRect(this.x + offsetX, this.y + offsetY, this.width, this.height);
}
}