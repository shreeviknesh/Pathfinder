async function dfs() {
    let end = board.end;
    let Stack = [board.start];

    // While the queue has elements, i.e., a path could exist
    while (Stack.length > 0 && !interrupt) {
        let current = Stack[0];
        Stack.splice(0, 1);

        // FOUND THE END NODE
        if (current == end) {
            await drawPath();
            return;
        }

        if (current.seen == false) {
            current.seen = true;
            current.show(activeColor);

            // CONTROLLING THE FPS by sleeping only if it's an important node
            await sleep(1000 / fps).then(() => { current.show(seenColor) });

            // Checking every neighbor of current node
            for (let pos of board.getNeighbors(current)) {
                let node = board.grid[pos[0]][pos[1]];
                if (!node.seen && !node.wall) {
                    node.parent = current;
                    Stack.unshift(node);
                }
            }
        }
    }
}