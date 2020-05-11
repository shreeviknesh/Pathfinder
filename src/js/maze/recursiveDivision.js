async function recDivSetup() {
    for (let j = 0; j < board.cols; j++) {
        board.addWall(j, 0);
        board.addWall(j, board.rows - 1);
        await sleep(750 / fps);
    }

    for (let i = 1; i < board.rows - 1; i++) {
        board.addWall(0, i);
        board.addWall(board.cols - 1, i);
        await sleep(750 / fps);
    }
}

async function recDivChooseOrientation(ccc, rrr) {
    if (ccc < rrr) {
        return "horizontal";
    }
    else if (rrr < ccc) {
        return "vertical";
    }
    else if (Math.random() > 0.5) {
        return "horizontal";
    }
    else {
        return "vertical";
    }
}

async function recDivAlgorithm(sr, sc, er, ec, orientation) {
    let nr = er - sr;
    let nc = ec - sc;

    if (nr < 2 || nc < 2) {
        return;
    }

    if (orientation == undefined) {
        orientation = recDivChooseOrientation(nc, nr);
    }

    if (orientation == "horizontal") {
        let randRow = randInt(sr, er + 1);
        let randCol = randInt(sc, ec + 1);

        for (let j = sc; j <= ec; j++) {
            if (j != randCol) {
                board.addWall(j, randRow);
                await sleep(750 / fps);
            }
        }
        await recDivAlgorithm(sr, sc, randRow - 1, ec, "vertical");
        await recDivAlgorithm(randRow + 1, sc, er, ec, "vertical");
    }
    else {
        let randCol = randInt(sc, ec + 1);
        let randRow = randInt(sr, er + 1);

        for (let i = sr; i <= er; i++) {
            if (i != randRow) {
                board.addWall(randCol, i);
                await sleep(750 / fps);
            }
        }
        await recDivAlgorithm(sr, sc, er, randCol - 1, "horizontal");
        await recDivAlgorithm(sr, randCol + 1, er, ec, "horizontal");
    }
}

async function recursiveDivision() {
    await board.reset();
    await recDivSetup();
    await recDivAlgorithm(1, 1, board.rows - 2, board.cols - 2);
}