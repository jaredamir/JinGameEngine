const blockScale = 10;
const origin = { x: 0, y: 0 };
const canvas = document.getElementById('game');
const aspectRatio = 16 / 9;
const blockSize = canvasWidth / blockScale;
const ctx = canvas.getContext('2d');

const chunk = {
    origin: { x: 0, y: 0 },
    data: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]}

class World {
  constructor(canvas) {
    this.name = 'world';
    this.canvas = canvas;
    this.loadedChunks = [];
  }

  addChunk(chunk) {
    this.loadedChunks.push(chunk);
  }

  renderChunk(chunk) {
    
  }
}