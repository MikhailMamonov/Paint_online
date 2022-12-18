import Brush from './Brush';

export default class Eraser extends Brush {
  constructor(canvas, socket, sessionId) {
    super(canvas, socket, sessionId);
    this.listen();
  }

  draw(x, y) {
    this.ctx.strokeStyle = 'white';
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }
}
