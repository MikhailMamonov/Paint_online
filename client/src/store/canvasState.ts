import { makeAutoObservable } from 'mobx';

class CanvasState {
  canvas: HTMLCanvasElement | null= null;
  socket: WebSocket|null = null;
  sessionId: string|null = null;
  undoList: string[] = [];
  redoList:string[] = [];
  username: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  setSocket(socket: WebSocket) {
    this.socket = socket;
  }

  setSessionId(sessionId:string) {
    this.sessionId = sessionId;
  }

  setUsername(username: string) {
    this.username = username;
  }

  pushToUndo(data: string) {
    this.undoList.push(data);
  }

  pushToRedo(data: string) {
    this.undoList.push(data);
  }

  undo() {
    if (!this.canvas || !(this.canvas.getContext('2d') instanceof CanvasRenderingContext2D)) {
        throw new Error('Failed to get 2D context');
    }
    let ctx = this.canvas.getContext('2d');
    if (this.undoList.length > 0) {
      const dataUrl:string = this.undoList.pop();
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
