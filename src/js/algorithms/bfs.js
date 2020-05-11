async function bfs() {
    let end = board.end;
    let Queue = [board.start];
    board.start.seen = true;

    // While the queue has elements, i.e., a path could exist
    while (Queue.length > 0 && !interrupt) {
        let current = Queue[0];
        Queue.splice(0, 1);
        current.show(visitedColor);

        // Checking every neighbor of current node
        for (let pos of board.getNeighbors(current)) {
            let node = board.grid[pos[0]][pos[1]];

            if (interrupt) {
                return;
            }

            // IF any of the neighbors is the end, then exit
            if (node == end) {
                node.parent = current;
                await drawPath();
                return;
            }

            if (node.seen == false && node.wall == false) {
                node.show(discoveredColor);
                node.seen = true;
                node.parent = current;
                Queue = Queue.concat(node);
                await sleep(1000 / fps);
            }
        }
    }
}