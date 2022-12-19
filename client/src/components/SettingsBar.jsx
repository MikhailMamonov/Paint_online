import React from 'react';
import toolState from '../store/toolState';
import './../styles/toolbar.scss';

const SettingsBar = () => {
  return (
    <div className="settings-bar">
      <label htmlFor="line-width">Толщина линии</label>
      <input
        id="line-width"
        type="number"
        style={{ margin: '0 10px' }}
        defaultValue={1}
        min={1}
        max={50}
        onChange={(e) => {
          toolState.setLineWidth(e.target.value);
        }}
      />
      <label htmlFor="stroke-color">Цвет обводки</label>
      <input
        id="stroke-color"
        type="color"
        style={{ margin: '0 10px' }}
        defaultValue={1}
        min={1}
        max={50}
        onChange={(e) => {
          toolState.setStrokeColor(e.target.value);
        }}
      />
    </div>
  );
};

export default SettingsBar;
