let PriorityQueue;

// helper function to insert node into priority queue
async function PQinsert(node) {
    for (let i = 0; i < PriorityQueue.length; i++) {
        if (node.heuristic < PriorityQueue[i].heuristic) {
            PriorityQueue.splice(i, 0, node);
            return;
        }
    }
    PriorityQueue.push(node);
}


async function bestFirstSearch() {
    await board.initializeHeuristics();
    PriorityQueue = [board.start];
    board.start.seen = true;

    while (PriorityQueue.length > 0 && !interrupt) {
        let current = PriorityQueue.splice(0, 1)[0];
        current.show(visitedColor);

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
                node.show(discoveredColor);
                node.seen = true;
                node.parent = current;
                PQinsert(node);
                await sleep(1000 / fps);
            }
        }
    }
}