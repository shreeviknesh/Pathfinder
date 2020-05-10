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

    show(color) {
        context.strokeStyle = borderColor;

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
            // context.fillRect(this.x * scale + offset, this.y * scale + offset, scale - 2 * offset, scale - 2 * offset);
        }
        else if (color) {
            context.fillStyle = color;;
            // context.fillRect(this.x * scale + offset, this.y * scale + offset, scale - 2 * offset, scale - 2 * offset);
        }
        else if (this.seen) {
            context.fillStyle = seenColor;
            // context.fillRect(this.x * scale + offset, this.y * scale + offset, scale - 2 * offset, scale - 2 * offset);
        }
        else {
            context.fillStyle = 'white';
        }

        context.strokeRect(this.x * scale + offset, this.y * scale + offset, scale - 2 * offset, scale - 2 * offset);
        context.fillRect(this.x * scale + offset, this.y * scale + offset, scale - 2 * offset, scale - 2 * offset);
    }
}