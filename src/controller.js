
let keys ={
    'ArrowUp': false,
    'ArrowDown': false,
    'ArrowLeft': false,
    'ArrowRight': false
}

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            camera.changeY(yDirection);
            break;
        case 'ArrowDown':
            camera.changeY(-yDirection);
            break;
        case 'ArrowLeft':
            camera.changeX(xDirection);
            break;
        case 'ArrowRight':
            camera.changeX(-xDirection);
            break;
        default:
            break;
    }
});