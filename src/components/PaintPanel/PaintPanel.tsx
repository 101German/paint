import React, { FC } from 'react';
import "./PaintPanel.css";

interface PaintPanelProps {}

const PaintPanel: FC<PaintPanelProps> = () => (
  <div className="container">
  <div className="paint-panel">
    <div className="tool-board">
      <p>Shapes:  </p>
      <ul>
        <li className="option-shape">
        <svg width="30" height="25" xmlns="http://www.w3.org/2000/svg">
           <rect width="10" height="10" x="5" y="9" />
          </svg>
          <span>Rectangle</span>
        </li>
        <li  className="option-shape">
        <svg width="30" height="20" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="9" r="6"/>
         </svg>
         <span>Circle</span>
        </li>
      </ul>
    </div>
    <div className="drawing-board">
      <canvas className="draw-payload"></canvas>
    </div>
  </div>
  </div>
);

export default PaintPanel;
