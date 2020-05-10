const canvas = document.getElementById('main-canvas');
const context = canvas.getContext('2d');
const fps = 65;
let scale = 25;
let offset = 2.5;

const widthRatio = 0.95;
const heightRatio = 0.95;
let width, height;
let board;

const startImg = "src/img/start.svg";
const endImg = "src/img/end.svg";

const borderColor = "#247AFD";
const startColor = "#01FF70";
const endColor = "#FFDC00";
const seenColor = "#EDC8FE";
const pathColor = "#01F9C6";
const wallColor = "#040348";
const activeColor = "#98FB98";

// user controls this using a button
const diagonals = false;
let interrupt = false;
let visualizing = false;

async function initialize() {
    setSize();
    board = new Board();
    board.show();
}

async function BFS() {
    interrupt = false;
    visualizing = true;
    await bfs().then(() => { visualizing = false });
}

async function DFS() {
    interrupt = false;
    visualizing = true;
    await dfs().then(() => { visualizing = false });
}

window.onresize = () => {
    reset();
}

async function reset() {
    interrupt = true;
    await sleep(200);
    initialize();
}

initialize();