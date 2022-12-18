import { makeAutoObservable } from 'mobx';
import Tool from '../tools/Tool';

class ToolState {
  tool: Tool | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setTool(tool: Tool) {
    this.tool = tool;
  }

  setStrokeColor(color: string) {
    this.tool.changeStrokeColor = color;
  }

  setFillColor(color: string) {
    this.tool.changeFillColor = color;
  }

  setLineWidth(color: string) {
    this.tool.changeLineWidth = color;
  }
}

export default new ToolState();
