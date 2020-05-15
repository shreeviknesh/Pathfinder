class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.wall = false;
        this.seen = false;
        this.parent = false;

        this.weight = 0;

        // if this is a start of end node
        this.start = false;
        this.end = false;
    }

    // Toggle the wall
    toggleWall() {
        if (this.start || this.end) {
            return;
        }
        if (this.wall) {
            this.wall = false;
            this.weight = 0;
        }
        else {
            this.wall = true;
            this.weight = Infinity;
        }
    }

    async visitNode() {
        sleep(2500 / fps).then(() => {
            this.show(visitedColor);
        });
    }

    async discoverNode(parent) {
        this.seen = true;
        this.parent = parent;
        this.show(activeColor);
        sleep(2500 / fps).then(() => {
            this.show(discoveredColor);
        });
        await sleep(1000 / fps);
    }

    async show(color) {
        // Default fill and stroke
        context.lineWidth = 1;
        context.strokeStyle = defaultBorder;
        context.fillStyle = defaultColor;

        // Change the fill and stroke if needed
        if (this.start) {
            let image = new Image();
            image.src = startImg;
            image.onload = () => {
                context.clearRect(this.x * scale, this.y * scale, scale, scale);
                context.drawImage(image, this.x * scale + 2, this.y * scale + 2, scale - 4, scale - 4);
            };
            return;
        }
        else if (this.end) {
            let image = new Image();
            image.src = endImg;
            image.onload = () => {
                context.clearRect(this.x * scale, this.y * scale, scale, scale);
                context.drawImage(image, this.x * scale + 1, this.y * scale + 1, scale - 2, scale - 2);
            };
            return;
        }
        else if (this.wall) {
            context.fillStyle = wallColor;
        }
        else if (color) {
            context.fillStyle = color;
        }
        else if (this.seen) {
            context.fillStyle = seenColor;
        }

        if (this.weight != 0) {
            context.lineWidth = weightValue;
            context.strokeStyle = weightBorder;
        }
        else {
            context.lineWidth = 1;
        }

        // fill and stroke the rect
        context.strokeRect(this.x * scale + offset, this.y * scale + offset, scale - 2 * offset, scale - 2 * offset);
        context.fillRect(this.x * scale + offset, this.y * scale + offset, scale - 2 * offset, scale - 2 * offset);
    }

    async drawPathLine(prev) {
        context.lineWidth = 1;
        context.strokeStyle = pathLineColor;
        let bx = this.x * scale + scale / 2;
        let by = this.y * scale + scale / 2;
        let ex = prev.x * scale + scale / 2;
        let ey = prev.y * scale + scale / 2;

        context.beginPath();
        context.moveTo(bx, by);
        context.lineTo(ex, ey);
        context.stroke();
        context.closePath();

        if (prev == board.start) {
            board.start.show();
        }
        if (this == board.end) {
            board.end.show();
        }
    }
}