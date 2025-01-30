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