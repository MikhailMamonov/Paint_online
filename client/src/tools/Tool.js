export default class Tool {
  constructor(canvas, socket, sessionId) {
    this.canvas = canvas;
    this.socket = socket;
    this.sessionId = sessionId;
    this.ctx = canvas.getContext('2d');
    this.destroyEvent();
  }

  set changeFillColor(color) {
    this.ctx.fillStyle = color;
  }

  set changeStrokeColor(color) {
    this.ctx.strokeStyle = color;
  }

  set changeLineWidth(lineWidth) {
    this.ctx.lineWidth = lineWidth;
  }

  destroyEvent() {
    this.canvas.onmousemove = null;
    this.canvas.onmouseup = null;
    this.canvas.onmousedown = null;
  }
}
