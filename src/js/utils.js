// Drawing the shortest path from end to beginning
// this should be called ONLY IF the path exists
async function drawPath() {
    // end
    let current = board.end.parent;
    let path = [];

    // from end to beginning
    while (current != board.start) {
        path.unshift(current);
        current = current.parent;
    }

    for (let i = 0; i < path.length; i++) {
        path[i].show(pathColor);
        await sleep(2500 / fps);
    }
}

// Helper function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Sets the size of the canvas
async function setSize() {
    width = (window.innerWidth * widthRatio) - ((window.innerWidth * widthRatio) % scale);
    height = window.innerHeight * heightRatio;
    canvas.width = width;
    canvas.height = height;
}