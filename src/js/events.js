function getGridIndicesFromPos(posx, posy) {
    const rect = canvas.getBoundingClientRect();
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
    if (visualizing) {
        return;
    }
    let indices = getGridIndicesFromPos(event.clientX, event.clientY);
    if (indices) {
        board.toggleWall(indices.x, indices.y);
    }
});

let mouseDragging = false;
canvas.addEventListener('mousedown', event => {
    if (visualizing) {
        return;
    }
    mouseDragging = true;
});

canvas.addEventListener('mousemove', event => {
    if (visualizing || !mouseDragging) {
        return;
    }
    let indices = getGridIndicesFromPos(event.clientX, event.clientY);
    if (indices) {
        board.addWall(indices.x, indices.y);
    }
});

canvas.addEventListener('mouseup', event => {
    if (visualizing) {
        return;
    }
    mouseDragging = false;
});