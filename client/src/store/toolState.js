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

  subtract() {
    this.count -= 1;
  }
}

export default new ToolState();
