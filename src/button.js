/*jshint esversion: 6 */

class Button {
    constructor(x, y, w, h, text, ox, oy) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text = text;
        this.ox = ox;
        this.oy = oy;
    }

    clicked() {
        return mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h;
    }

    draw() {
        this.clicked() ? fill(255) : noFill();
        rect(this.x, this.y, this.w, this.h);
        this.clicked() ? fill(0) : fill(255);
        textAlign(CENTER);
        textSize(60);
        text(this.text, this.x + this.w / 2 + this.ox, this.y + this.h / 2 + this.oy);
    }
}