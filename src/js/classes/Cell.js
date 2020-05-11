class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.wall = false;
        this.seen = false;
        this.parent = false;

        // if this is a start of end node
        this.start = false;
        this.end = false;
    }

    // Toggle the wall
    toggleWall() {
        if (this.start || this.end) {
            return;
        }
        this.wall = !(this.wall);
    }

    async show(color) {
        // Default fill and stroke
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

        // fill and stroke the rect
        context.strokeRect(this.x * scale + offset, this.y * scale + offset, scale - 2 * offset, scale - 2 * offset);
        context.fillRect(this.x * scale + offset, this.y * scale + offset, scale - 2 * offset, scale - 2 * offset);
    }

    async drawPathLine(prev) {
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