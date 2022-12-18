import React from 'react';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import Brush from '../tools/Brush';
import Circle from '../tools/Circle';
import Eraser from '../tools/Eraser';
import Line from '../tools/Line';
import Rect from '../tools/Rect';
import './../styles/toolbar.scss';
import { ToolBarButton } from './ToolBarButton';

const Toolbar = () => {
  const tools = [
    { tool: Brush, toolClassName: 'brush' },
    { tool: Rect, toolClassName: 'rect' },
    { tool: Circle, toolClassName: 'circle' },
    { tool: Line, toolClassName: 'line' },
    { tool: Eraser, toolClassName: 'eraser' },
  ];
  const download = () => {
    const dataURL = canvasState.canvas.toDataURL();
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = canvasState.sessionId + '.jpg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="toolbar">
      {tools.map((tool) => (
        <ToolBarButton
          tool={tool.tool}
          toolClassName={tool.toolClassName}
        ></ToolBarButton>
      ))}

      <input
        type="color"
        className="toolbar__input"
        onChange={(e) => {
          toolState.setFillColor(e.target.value);
        }}
      />
      <button
        className="toolbar__btn undo"
        onClick={() => {
          canvasState.undo();
        }}
      ></button>
      <button
        className="toolbar__btn redo"
        onClick={() => {
          canvasState.redo();
        }}
      ></button>
      <button
        className="toolbar__btn save"
        onClick={() => {
          download();
        }}
      ></button>
    </div>
  );
};

export default Toolbar;
