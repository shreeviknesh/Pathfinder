async function bfs() {
    let end = board.end;
    let Queue = [board.start];

    // While the queue has elements, i.e., a path could exist
    while (Queue.length > 0 && !interrupt) {
        let current = Queue[0];
        Queue.splice(0, 1);

        // FOUND THE END NODE
        if (current == end) {
            await drawPath();
            return;
        }

        // Checking every neighbor of current node
        for (let pos of board.getNeighbors(current)) {
            let node = board.grid[pos[0]][pos[1]];

            // IF any of the neighbors is the end, then exit
            if (node == end) {
                node.parent = current;
                await drawPath();
                return;
            }
            if (node.seen == false && node.wall == false) {
                node.show(activeColor);
                node.seen = true;
                node.parent = current;
                Queue = Queue.concat(node);
            }
        }

        // CONTROLLING THE FPS by sleeping
        await sleep(1000 / fps);
    }

    // NOT FOUND 
    clearInterval(loopID);
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
}

// Helper function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}