//export 
class Entity {
  constructor(x, y, name, healthCapacity, regenerationRate) {
    this.id = Math.random();
    this.x = x;
    this.y = y;
    this.name = name;
    this.healthCapacity = healthCapacity;
    this.health = healthCapacity;
    this.regenerationRate = regenerationRate;
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
  
}