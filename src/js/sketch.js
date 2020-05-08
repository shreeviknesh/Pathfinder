const canvas = document.getElementById('main-canvas');
const context = canvas.getContext('2d');
const fps = 60;
let scale = 30;

const widthRatio = 0.95;
const heightRatio = 0.95;
let width, height;
let board;
let loopID;

const borderColor = "#001f3f";
const startColor = "#01FF70";
const endColor = "#FFDC00";
const seenColor = "#85144b"
const pathColor = "#7FDBFF";
const wallColor = "#181818";
const activeColor = "#98FB98";

// user controls this using a button
const diagonals = false;
let interrupt = false;

async function initialize() {
    clearInterval(loopID);
    setSize();
    board = new Board();
    show();
}

async function BFS() {
    interrupt = false;
    bfs().then(clearInterval(loopID));
    loopID = setInterval(show, 1000 / fps);
}

async function DFS() {
    interrupt = false;
    dfs().then(clearInterval(loopID));
    loopID = setInterval(show, 1000 / fps);
}

window.onresize = () => {
    clearInterval(loopID);
    initialize();
}

function resetBtn() {
    interrupt = true;
    clearInterval(loopID);
    initialize();
}

function show() {
    board.show();
}

async function setSize() {
    width = (window.innerWidth * widthRatio) - ((window.innerWidth * widthRatio) % scale);
    height = window.innerHeight * heightRatio;
    canvas.width = width;
    canvas.height = height;
}

canvas.addEventListener('click', event => {
    const rect = canvas.getBoundingClientRect();
    board.addWall(event.clientX - rect.left, event.clientY - rect.top);
});

initialize();