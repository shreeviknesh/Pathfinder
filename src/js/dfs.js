async function dfs() {
    let end = board.end;
    let Stack = [board.start];

    // While the queue has elements, i.e., a path could exist
    while (Stack.length > 0) {
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
            await sleep(1000 / fps);

            // Checking every neighbor of current node
            for (let pos of board.getNeighbors(current)) {
                let node = board.grid[pos[0]][pos[1]];
                if (node.seen == false) {
                    node.parent = current;
                    Stack.unshift(node);
                }
            }
        }
    }

    // NOT FOUND 
    clearInterval(loopID);
    finished = false;
}

// Drawing the shortest path from end to beginning
// this should be called ONLY IF the path exists
async function drawPath() {
    clearInterval(loopID);
    // end
    let current = board.end.parent;

    // from end to beginning
    while (current != board.start) {
        current.show(pathColor);
        current = current.parent;
        await sleep(2000 / fps);
    }

    finished = true;
}

// Helper function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}