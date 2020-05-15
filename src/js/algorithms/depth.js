async function depthFirstSearch() {
    let Stack = [board.start];
    board.end.seen = false;

    // While the Stack has elements, i.e., a path could exist
    while (Stack.length > 0 && !interrupt) {
        let current = Stack.pop();
        current.visitNode();

        // IF current is the end, then exit
        if (current == board.end) {
            await drawPath();
            return;
        }

        // Checking every neighbor of current node
        for (let pos of board.getNeighbors(current).reverse()) {
            let node = board.grid[pos[0]][pos[1]];

            if (interrupt) {
                return;
            }

            if (node.seen == false && node.wall == false) {
                node.discoverNode(current);
                Stack.push(node);
            }
        }
        await sleep(1000 / fps);
    }
}