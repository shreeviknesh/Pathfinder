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

    for (let i = 1; i < path.length; i++) {
        await path[i].show(pathColor);

        // draw a path from this to prev
        await path[i].drawPathLine(path[i - 1]);
        await sleep(2500 / fps);
    }
}

// Async sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Resets the board i.e., the path and the walls
async function reset() {
    interrupt = true;
    await sleep(1005 / fps);
    board.reset();
    interrupt = false;
}

// Removes the path 
async function resetPath() {
    interrupt = true;
    await sleep(1005 / fps);
    board.clearPath();
    interrupt = false;
}

// A new board is generated when the window is resized
async function resizeFn() {
    interrupt = true;
    await sleep(1005 / fps);
    setSize();
    board = new Board();
    board.show();
    interrupt = false;
}
window.onresize = resizeFn;

// Wrapper function to call randomMaze
async function generateRandomMaze() {
    if (doingSomething) {
        return;
    }
    doingSomething = true;
    document.getElementById("resetPathBtn").innerHTML = "Stop";
    await randomMaze(randomMazeProbability).then(() => { doingSomething = false });
    document.getElementById("resetPathBtn").innerHTML = "Clear Path";
}