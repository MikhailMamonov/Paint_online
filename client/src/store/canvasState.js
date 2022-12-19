import { makeAutoObservable } from 'mobx';

class CanvasState {
  canvas = null;
  ctx = null;
  socket = null;
  sessionId = null;
  undoList = [];
  redoList = [];
  username = '';

  constructor() {
    makeAutoObservable(this);
  }

  setCanvas(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  setSocket(socket) {
    this.socket = socket;
  }

  setSessionId(sessionId) {
    this.sessionId = sessionId;
  }

  setUsername(username) {
    this.username = username;
  }

  pushToUndo(data) {
    this.undoList.push(data);
  }

  pushToRedo(data) {
    this.undoList.push(data);
  }

  undo() {
    if (this.undoList.length > 0) {
      const dataUrl = this.undoList.pop();
      const img = new Image();
      img.src = dataUrl;
      this.pushToRedo(this.canvas.toDataURL());
      img.onload = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      };
    } else {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  redo() {
    if (this.redoList.length > 0) {
      const dataUrl = this.redoList.pop();
      const img = new Image();
      img.src = dataUrl;
      this.pushToUndo(this.canvas.toDataURL());
      img.onload = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      };
    }
  }
}

export default new CanvasState();
