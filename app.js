import { CubeHeight } from "./cubeheight.js";
let mouse = {
  x: undefined,
  y: undefined,
  range: 40,
};

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    window.addEventListener("resize", this.resize.bind(this));
    this.resize();

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });

    window.requestAnimationFrame(this.animate.bind(this));
  }
  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;

    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    this.cubeHeight = new CubeHeight(this.stageWidth / 2, 0, 10, 10);
    this.cubeHeight.resize();
  }
  animate() {
    window.requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.cubeHeight.draw(this.ctx, mouse);

    this.ctx.beginPath();
    this.ctx.fillStyle = "rgba(246, 229, 141, 0.7)";
    this.ctx.arc(mouse.x, mouse.y, mouse.range, 0, Math.PI * 2, false);
    this.ctx.fill();
  }
}

window.onload = () => {
  new App();
};
