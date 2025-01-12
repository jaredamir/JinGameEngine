import {Entity} from './entity';

export class Player extends Entity {
  constructor(x, y, name, speed, healthCapacity) {
    super(x, y, name);
    this.type = "player";
    this.speed = speed;
    this.name = name;
    this.inventory = [];
  }

  info() {
    return {
        id: this.id,
        x: this.x,
        y: this.y,
        name: this.name,
        type: this.type,
    }
  }

  render() {
    return 
  }
}