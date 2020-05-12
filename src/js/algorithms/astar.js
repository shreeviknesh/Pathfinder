async function astar() {
    let PriorityQueue = [board.start];
    board.start.seen = true;
    board.start.gScore = 0;

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
                node.gScore = current.gScore + 1;
                PQinsert(PriorityQueue, node);
                await sleep(1000 / fps);
            }
        }
    }
}