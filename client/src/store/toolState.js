import { makeAutoObservable } from 'mobx';

class ToolState {
  tool = null;

  constructor() {
    makeAutoObservable(this);
  }

  setTool(tool) {
    this.tool = tool;
  }

  setStrokeColor(color) {
    this.tool.changeStrokeColor = color;
  }

  setFillColor(color) {
    this.tool.changeFillColor = color;
  }

  setLineWidth(color) {
    this.tool.changeLineWidth = color;
  }
}

export default new ToolState();
