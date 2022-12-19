import Brush from './Brush';

export default class Eraser extends Brush {
  constructor(canvas, socket, sessionId) {
    super(canvas, socket, sessionId);
    this.listen();
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      this.socket.send(
        JSON.stringify({
          id: this.sessionId,
          method: 'draw',
          figure: {
            type: 'eraser',
            x: e.pageX - e.target.offsetLeft,
            y: e.pageY - e.target.offsetTop,
            lineWidth: this.ctx.lineWidth,
          },
        })
      );
    }
  }

  static draw(ctx, x, y, lineWidth) {
    ctx.strokeStyle = 'white';
    ctx.lineWidth = lineWidth;
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
