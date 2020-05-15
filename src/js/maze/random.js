async function randomMaze(probability) {
    board.reset();
    for (let j = 0; j < board.cols && !interrupt; j++) {
        for (let i = 0; i < board.rows && !interrupt; i++) {
            board.grid[i][j].wall = false;
            if (Math.random() <= probability) {
                board.addWall(j, i);
                await sleep(400 / fps);
            }
        }
    }
}

async function randomWeightMaze(probability) {
    board.reset();
    for (let j = 0; j < board.cols && !interrupt; j++) {
        for (let i = 0; i < board.rows && !interrupt; i++) {
            board.grid[i][j].weight = 0;
            if (Math.random() <= probability * 1.24) {
                board.addWeight(j, i);
                await sleep(400 / fps);
            }
        }
    }
}
