import { makeAutoObservable } from 'mobx';

class CanvasState {
  canvas = null;
  socket = null;
  sessionId = null;
  undoList = [];
  redoList = [];
  username = '';

  constructor() {
    makeAutoObservable(this);
  }

  get() {
    return this.count < 0 ? 'Yes' : 'No';
  }

  setCanvas(canvas) {
    this.canvas = canvas;
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
    let ctx = this.canvas.getContext('2d');
    if (this.undoList.length > 0) {
      const dataUrl = this.undoList.pop();
      const img = new Image();
      img.src = dataUrl;
      this.pushToRedo(this.canvas.toDataURL());
      img.onload = () => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      };
    } else {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  redo() {
    let ctx = this.canvas.getContext('2d');
    if (this.redoList.length > 0) {
      const dataUrl = this.redoList.pop();
      const img = new Image();
      img.src = dataUrl;
      this.pushToUndo(this.canvas.toDataURL());
      img.onload = () => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      };
    }
  }
}

export default new CanvasState();
