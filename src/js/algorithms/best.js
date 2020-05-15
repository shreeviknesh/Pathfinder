// helper function to insert node into priority queue
async function bestFirstPQinsert(PriorityQueue, node) {
    for (let i = 0; i < PriorityQueue.length; i++) {
        if (node.hScore + node.weight < PriorityQueue[i].hScore + PriorityQueue[i].weight) {
            PriorityQueue.splice(i, 0, node);
            return;
        }
    }
    PriorityQueue.push(node);
}

async function bestFirstSearch() {
    let PriorityQueue = [board.start];
    board.start.seen = true;

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
                bestFirstPQinsert(PriorityQueue, node);
                await sleep(1000 / fps);
            }
        }
    }
}