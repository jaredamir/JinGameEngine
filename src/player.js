//import { Entity } from './entity';

//export 
class Player extends Entity {
  constructor(x, y, name, speed, healthCapacity, regenerationRate) {
    super(x, y, name, healthCapacity, inventory, regenerationRate, health); 
    this.type = "player";
    this.speed = speed;
    this.inventory = inventory;
    this.health = health
  }

  info() {
    const baseInfo = super.info(); 
    return {
      ...baseInfo,
      type: this.type,
      speed: this.speed,
      inventory: this.inventory, 
      health: this.health 
    };

  }

  render() {
    return 
  }
}