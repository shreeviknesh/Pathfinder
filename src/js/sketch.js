const canvas = document.getElementById('main-canvas');
const context = canvas.getContext('2d');
const fps = 100;
let scale = 45;

const widthRatio = 0.95;
const heightRatio = 0.95;
let width, height;
let board;
let loopID;

const borderColor = "#001f3f";
const startColor = "#01FF70";
const endColor = "#FFDC00";
const seenColor = "pink";
const pathColor = "#7FDBFF";
const wallColor = "#181818";

// user controls this using a button
const diagonals = false;
let finished = false;

async function initialize() {
    setSize();
    board = new Board();
    show();
}

window.onresize = () => {
    clearInterval(loopID);
    initialize();
}

document.addEventListener('keydown', (event) => {
    if (event.keyCode == 32) {
        if (!finished) {
            bfs();
        }
    }
});

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
loopID = setInterval(show, 1000 / fps);