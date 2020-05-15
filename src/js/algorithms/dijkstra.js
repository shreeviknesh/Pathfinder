// helper function to insert node into priority queue for dijkstra
async function DijkstraPQinsert(PriorityQueue, node) {
    for (let i = 0; i < PriorityQueue.length; i++) {
        if (node.gScore + node.weight < PriorityQueue[i].gScore + PriorityQueue[i].weight) {
            PriorityQueue.splice(i, 0, node);
            return;
        }
    }
    PriorityQueue.push(node);
}

async function dijkstra() {
    let PriorityQueue = [board.start];
    board.start.seen = true;

    for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
            this.grid[i][j].gScore = Infinity;
        }
    }
    board.start.gScore = 0;

    while (PriorityQueue.length > 0 && !interrupt) {
        let current = PriorityQueue.splice(0, 1)[0];
        current.visitNode();

        if (current == board.end) {
            await drawPath();
            return;
        }

        for (let pos of board.getNeighbors(current)) {
            let node = board.grid[pos[0]][pos[1]];

            if (interrupt) {
                return;
            }

            if (node.seen == false && node.wall == false) {
                node.discoverNode(current);
                node.gScore = current.gScore + current.weight;
                DijkstraPQinsert(PriorityQueue, node);
                await sleep(1000 / fps);
            }
        }
    }
}