class Board {
    constructor() {
        this.rows = parseInt(height / scale);
        this.cols = parseInt(width / scale);
        this.grid = [];

        for (let i = 0; i < this.rows; i++) {
            let row = [];
            for (let j = 0; j < this.cols; j++) {
                row.push(new Cell(j, i));
            }
            this.grid.push(row);
        }

        // start and end indices
        let Y = parseInt(this.rows / 2);
        let X1 = parseInt(this.cols / 4);
        let X2 = parseInt(3 * this.cols / 4);

        this.grid[Y][X1].start = true;
        this.grid[Y][X2].end = true;

        this.start = this.grid[Y][X1];
        this.end = this.grid[Y][X2];
    }

    // Display all cells
    show() {
        context.clearRect(0, 0, width, height);
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.grid[i][j].show();
            }
        }
    }

    reset() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.grid[i][j].wall = false;
                this.grid[i][j].seen = false;
                this.grid[i][j].parent = false;

                if (Math.random() > 0.5 && randomInit) {
                    this.grid[i][j].wall = true;
                }
            }
        }
        this.show();
    }

    clearPath() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.grid[i][j].seen = false;
                this.grid[i][j].parent = false;
            }
        }
        this.show();
    }

    // Add a cell at a particular index
    addWall(x, y) {
        if (visualizing) {
            return;
        }
        this.grid[y][x].wall = true;
        this.grid[y][x].show();
    }

    // Toggle wall at particular index
    toggleWall(x, y) {
        if (visualizing) {
            return;
        }
        this.grid[y][x].toggleWall();
        this.grid[y][x].show();
    }

    // Returns the neighbors of a cell
    getNeighbors(cell) {
        let i = cell.y;
        let j = cell.x;
        let neighbors = [];

        if (diagonals) {
            if (i != 0 && j != this.cols - 1) {
                neighbors.push([i - 1, j + 1]);
            }
            if (i != this.rows - 1 && j != this.cols - 1) {
                neighbors.push([i + 1, j + 1]);
            }
            if (i != 0 && j != 0) {
                neighbors.push([i - 1, j - 1]);
            }
            if (i != this.rows - 1 && j != 0) {
                neighbors.push([i + 1, j - 1]);
            }
        }
        if (i != this.rows - 1) {
            neighbors.push([i + 1, j]);
        }
        if (i > 0) {
            neighbors.push([i - 1, j]);
        }
        if (j != this.cols - 1) {
            neighbors.push([i, j + 1]);
        }
        if (j > 0) {
            neighbors.push([i, j - 1]);
        }

        return neighbors;
    }
}