const widthRatio = 0.95;
const heightRatio = 0.9;

const fps = 90;
let scale = 40;
let offset = 2.5;

const canvas = document.getElementById('main-canvas');
const context = canvas.getContext('2d');

let width, height;
let board;

const startImg = "src/img/start.svg";
const endImg = "src/img/end.svg";

const startColor = "#01FF70";
const endColor = "#FFDC00";
const seenColor = "#EDC8FE";
const wallColor = "#343837";
const activeColor = "#98FB98";

const defaultBorder = "#247AFD";
const defaultColor = "#f5f5f5";

const pathColor = "#01F9C6";
const pathLineColor = "#FD4659";

// user controls this using a button
const diagonals = true;
const randomInit = true;

let interrupt = false;
let visualizing = false;

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
    resizeFn();
}

async function reset() {
    interrupt = true;
    await sleep(1005 / fps);
    board.reset();
    interrupt = false;
}

async function resetPath() {
    interrupt = true;
    await sleep(1005 / fps);
    board.clearPath();
    interrupt = false;
}

async function resizeFn() {
    interrupt = true;
    await sleep(1005 / fps);
    setSize();
    board = new Board();
    board.show();
}

setSize();
board = new Board();
board.show();