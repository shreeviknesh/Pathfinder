async function randomMaze(probability) {
    board.reset();
    for (let j = 0; j < board.cols && !interrupt; j++) {
        for (let i = 0; i < board.rows && !interrupt; i++) {
            board.grid[i][j].wall = false;
            if (Math.random() <= probability) {
                board.grid[i][j].wall = true;
                await sleep(500 / fps);
                board.grid[i][j].show();
            }
        }
    }
}