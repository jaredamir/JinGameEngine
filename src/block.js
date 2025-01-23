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
        this.healthCapacity = blockData.healthCapacity;
    }

    info() {
        const baseInfo = super.info();
        return {
            ...baseInfo,
            blockData: this.blockData,
        };
    }

    render(canvas, blockSize) {
        /* Glow for later
        canvas.shadowColor = 'rgba(0, 0, 0, 0.2)'; 
        canvas.shadowBlur = 20; // Amount of blur
        canvas.shadowOffsetX = 0; // No horizontal offset
        canvas.shadowOffsetY = 0; // No vertical offset
        */
        canvas.fillStyle = this.color;
        canvas.fillRect(this.x, this.y, blockSize, blockSize);
    }
}


/*
Block Texture Data
{
resolution (area): 100 //10x10 pixels,
baseColor: "lightgrey",
0: [['#4f1a6b', '#877fdf', '#6932e4', '#f4c3c6', '#12c24b', '#d1b6f3', '#4876bd', '#35c129', '#d36cd2', '#57472c'],
 ['#1f488f', '#49e96c', '#dd7ecd', '#99a8bf', '#b7f477', '#361222', '#84a7ab', '#6f7e2d', '#2f942d', '#e7655a'],
 ['#5392e0', '#69c008', '#56c8ae', '#db6491', '#cf21d8', '#1b8fdb', '#f41a38', '#26c2e6', '#453207', '#db62cc'],
 ['#4ae140', '#2ea94c', '#a8cb8f', '#d99607', '#828289', '#c3b144', '#e98447', '#67b97f', '#cb04e1', '#b66ec6'],
 ['#214c38', '#3e5738', '#ed4da7', '#b65899', '#2babc5', '#a11258', '#c67af1', '#5c3e1d', '#cc3a4d', '#a25a61'],
 ['#f9159f', '#38fef8', '#8747b5', '#52593f', '#84cc60', '#134203', '#5b2e5c', '#050fbc', '#41d23b', '#f3df7a'],
 ['#9f51cc', '#fee4d6', '#849cbd', '#3d6e7c', '#b05641', '#e68c45', '#929682', '#208859', '#f29254', '#b6c64e'],
 ['#7b57d0', '#751b97', '#72c873', '#bc53d9', '#40ffc6', '#d0e812', '#96bb2e', '#e6c956', '#38b35f', '#77e060'],
 ['#bb3775', '#ae2906', '#a345be', '#88215e', '#68c70f', '#b56b7a', '#3cf7f5', '#f5dcd9', '#3888b5', '#2cda23'],
 ['#69abf0', '#cc90d0', '#ad6375', '#98e39d', '#c53289', '#f38e21', '#968900', '#2a50ce', '#8a3a3c', '#f78317']],

 1: [['#a5d8e6', '#35e93a', '#2f7f4d', '#9c6ef8', '#f545c8', '#ca3b5f', '#00655f', '#fdcc9c', '#d20f1c', '#ffb8f4'],
 ['#255eec', '#e512e3', '#eccf63', '#ad87c3', '#4c902e', '#125a8f', '#00a5b5', '#88c796', '#6e376d', '#23c70c'],
 ['#f8c724', '#3f7588', '#d0f8f9', '#4a9e69', '#a8dec0', '#fd2cd0', '#0f07b9', '#6b3baf', '#4d835b', '#99139e'],
 ['#902674', '#e67b4e', '#3e9e1c', '#9071cb', '#34f5bc', '#a150b0', '#6fa560', '#394038', '#b926e8', '#4b1883'],
 ['#6f5d88', '#9c49e4', '#1c3f50', '#e8dledo', '#bc301f', '#81a0b7', '#3f616b', '#faf88c', '#8772af', '#5353cf'],
 ['#459e1d', '#7a0c98', '#b5b473', '#3e1fec', '#0bbc45', '#3d8b9e', '#62fd81', '#f54465', '#9fda03', '#b64747'],
 ['#e25c12', '#78d2ea', '#6ff096', '#b1c594', '#13151c', '#f5b715', '#377b18', '#501e63', '#7cdb0e', '#a1f958'],
 ['#a0e00c', '#99ba8d', '#8bf051', '#d9f72f', '#bd7932', '#ea4517', '#3bc205', '#7cb9bb', '#52106e', '#9bb04b'],
 ['#fc46ef', '#74a1a7', '#2eee84', '#676e9e', '#4c5ae5', '#32e69e', '#3a93d1', '#d7dc54', '#b5df7d', '#9e433e'],
 ['#a8a3f3', '#67d870', '#5208a4', '#ffc4bc', '#46e4b3', '#ff4593', '#8e5fa8', '#a43c6a', '#e0d9a1', '#1d33b3']],


}
*/