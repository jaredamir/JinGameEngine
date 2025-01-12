//import { Entity } from "./entity";

//export 
class Block extends Entity {
    constructor(x, y, blockData) {
        super(x, y);
        this.blockData = blockData;
        this.x = x;
        this.y = y;
        this.name = blockData.name;
        this.color = blockData.color;
    }

    info() {
        const baseInfo = super.info();
        return {
            ...baseInfo,
            blockData: this.blockData,
        };
    }

    render(canvas, blockSize) {
        canvas.fillStyle = this.color;
        canvas.fillRect(this.x, this.y, blockSize, blockSize);
    }
}