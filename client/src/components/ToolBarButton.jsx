import React from 'react';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';

export const ToolBarButton = ({ tool, toolClassName }) => {
  return (
    <button
      className={`toolbar__btn ${toolClassName}`}
      onClick={() => {
        toolState.setTool(
          new tool(
            canvasState.canvas,
            canvasState.socket,
            canvasState.sessionId
          )
        );
      }}
    ></button>
  );
};
