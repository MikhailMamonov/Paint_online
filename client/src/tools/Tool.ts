export default class Tool {
  sessionId: string;
  socket: WebSocket;
  mouseDown: boolean;
  ctx: any;
  canvas: any;
  constructor(canvas: any, socket: WebSocket, sessionId: string) {
    this.canvas = canvas;
    this.socket = socket;
    this.sessionId = sessionId;
    this.ctx = canvas.getContext('2d');
    this.mouseDown = false;
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
