import React from 'react';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import Tool from '../tools/Tool';

type Props = {
  tool: Tool,
  toolClassName: string,
};

export const ToolBarButton = ({ tool, toolClassName }: Props) => {
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
