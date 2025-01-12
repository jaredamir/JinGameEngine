//import { Entity } from './entity';

//export 
class Player extends Entity {
  constructor(x, y, name, speed, healthCapacity, regenerationRate) {
    super(x, y, name, healthCapacity, regenerationRate); 
    this.type = "player";
    this.speed = speed;
    this.inventory = [];
  }

  info() {
    const baseInfo = super.info(); 
    return {
      ...baseInfo,
      type: this.type,
      speed: this.speed,
      inventory: this.inventory, 
    };
  }

  render() {
    return 
  }
}