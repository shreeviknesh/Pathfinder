// Sets the size of the canvas
async function setSize() {
    width = (window.innerWidth * widthRatio) - ((window.innerWidth * widthRatio) % scale);
    height = window.innerHeight * heightRatio;
    canvas.width = width;
    canvas.height = height;
}

// Drawing the shortest path from end to beginning
// this should be called ONLY IF the path exists
async function drawPath() {
    // end
    let path = [];
    let current = board.end;

    // from end to beginning
    while (current != board.start) {
        path.unshift(current);
        current = current.parent;
    }
    path.unshift(board.start);

    for (let i = 1; i < path.length - 1; i++) {
        path[i].show(pathColor);

        // draw a path
        path[i].drawPathLine(path[i - 1]);
        path[i].drawPathLine(path[i + 1]);
        await sleep(2500 / fps);
    }
}

// Async sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}