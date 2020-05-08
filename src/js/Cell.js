class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.wall = false;
        this.start = false;
        this.end = false;

        this.seen = false;
        this.parent = false;
    }


    toggleWall() {
        if (this.start || this.end) {
            return;
        }
        this.wall = !(this.wall);
    }

    setColor(color) {
        if (this.start || this.end) {
            return;
        }
        this.color = color;
    }

    show(color) {
        context.strokeStyle = borderColor;
        context.strokeRect(this.x * scale, this.y * scale, scale, scale);

        if (this.start) {
            context.fillStyle = startColor;
            context.fillRect(this.x * scale, this.y * scale, scale, scale);
        }
        else if (this.end) {
            context.fillStyle = endColor;
            context.fillRect(this.x * scale, this.y * scale, scale, scale);
        }
        else if (this.wall) {
            context.fillStyle = wallColor;
            context.fillRect(this.x * scale, this.y * scale, scale, scale);
        }
        else if (color) {
            context.fillStyle = color;;
            context.fillRect(this.x * scale, this.y * scale, scale, scale);
        }
        else if (this.seen) {
            context.fillStyle = seenColor;
            context.fillRect(this.x * scale, this.y * scale, scale, scale);
        }
    }
}