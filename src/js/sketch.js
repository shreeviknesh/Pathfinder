const widthRatio = 0.95;
const heightRatio = 0.9;

const fps = 75;
let scale = 25;
let offset = 2.5;

const canvas = document.getElementById('main-canvas');
const context = canvas.getContext('2d');

let width, height;
let board;

const randomMazeProbability = 0.43;

// Colors and images
const startImg = "src/img/start.svg";
const endImg = "src/img/end.svg";

const startColor = "#01FF70";
const endColor = "#FFDC00";
const discoveredColor = "#98FB98";
const visitedColor = "#EDC8FE";
const wallColor = "#343837";

const defaultBorder = "#247AFD";
const defaultColor = "#f5f5f5";

const pathColor = "#01F9C6";
const pathLineColor = "#FD4659";

// user controls this using a button
const diagonals = true;
const randomInit = true;

let interrupt = false;
let doingSomething = false;

// Wrapper function for all pathfinding algorithms
async function pathfinder(algoName) {
    if (doingSomething) {
        return;
    }
    doingSomething = true;
    if (algoName == "breadth") {
        await breadthFirstSearch().then(() => { doingSomething = false });
    }
    else if (algoName == "depth") {
        await depthFirstSearch().then(() => { doingSomething = false });
    }
    else if (algoName == "best") {
        await bestFirstSearch().then(() => { doingSomething = false });
    }
}

setSize();
board = new Board();
board.show();