async function breadthFirstSearch() {
    let Queue = [board.start];
    board.start.seen = true;
    board.end.seen = false;

    // While the queue has elements, i.e., a path could exist
    while (Queue.length > 0 && !interrupt) {
        let current = Queue.splice(0, 1)[0];
        await current.visitNode();

        // IF any of the neighbors is the end, then exit
        if (current == board.end) {
            await drawPath();
            return;
        }

        // Checking every neighbor of current node
        for (let pos of board.getNeighbors(current)) {
            let node = board.grid[pos[0]][pos[1]];

            if (interrupt) {
                return;
            }

            if (node.seen == false && node.wall == false) {
                // node was discovered from current node
                await node.discoverNode(current);
                Queue = Queue.concat(node);
            }
        }
    }
}