function getGridIndicesFromPos(posx, posy) {
    const rect = canvas.getBoundingClientRect();

    // Return false if the pos is outsize the canvas
    if (posx > rect.left + canvas.width) {
        return false;
    }
    let x = posx - rect.left;
    let y = posy - rect.top;
    x = parseInt(x / scale);
    y = parseInt(y / scale);

    return {
        x: x,
        y: y
    };
}

canvas.addEventListener('click', () => {
    if (doingSomething) {
        return;
    }
    let indices = getGridIndicesFromPos(event.clientX, event.clientY);
    if (indices) {
        board.toggleWall(indices.x, indices.y);
    }
});

// A variable to keep track of if the mouse is dragged
let mouseDragging = false;
canvas.addEventListener('mousedown', event => {
    if (doingSomething) {
        return;
    }
    mouseDragging = true;
});

canvas.addEventListener('mousemove', event => {
    if (doingSomething || !mouseDragging) {
        return;
    }
    let indices = getGridIndicesFromPos(event.clientX, event.clientY);
    if (indices) {
        board.addWall(indices.x, indices.y);
    }
});

canvas.addEventListener('mouseup', event => {
    if (doingSomething) {
        return;
    }
    mouseDragging = false;
});
