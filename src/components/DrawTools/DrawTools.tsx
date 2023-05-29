import React, { FC } from "react";
import "./DrawTools.css";
import { Option } from "../../Models/Option";

interface DrawToolsProps {
  handleOptionChange: (option: Option) => void;
  clearCanvas: () => void;
  publishDraw: () => void;
  options: Option;
}
const colorList = [
  "red",
  "green",
  "blue",
  "yellow",
  "black",
  "pink",
  "orange",
  "brown",
];

const sizeList = [
  { name: "Thin", value: 1 },
  { name: "Normal", value: 5 },
  { name: "Bold", value: 10 },
];

const DrawTools: FC<DrawToolsProps> = ({
  handleOptionChange,
  clearCanvas,
  publishDraw,
  options,
}) => {
  const handleColorGridClick = (color: string) => {
    const newOptions = Object.assign({}, options);
    newOptions.color = color;
    handleOptionChange(newOptions);
  };

  const handleShapeSelect = (shape: string) => {
    const newOptions = Object.assign({}, options);
    if (newOptions.shape === shape) {
      newOptions.shape = "";
    } else {
      newOptions.shape = shape;
    }
    handleOptionChange(newOptions);
  };

  const handleSizeOptionClick = (size: number) => {
    const newOptions = Object.assign({}, options);
    newOptions.size = size;
    handleOptionChange(newOptions);
  };

  const handleButtonClearClick = () => {
    clearCanvas();
  };

  const colorGrid = colorList.map((colorItem) => {
    if (colorItem === options.color) {
      return (
        <div
          key={colorItem}
          style={{
            width: "20px",
            height: "20px",
            padding: "1px",
            border: `1px solid ${colorItem}`,
          }}>
          <div
            key={colorItem}
            onClick={() => {
              handleColorGridClick(colorItem);
            }}
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: `${colorItem}`,
            }}></div>
        </div>
      );
    }
    return (
      <div
        key={colorItem}
        onClick={() => {
          handleColorGridClick(colorItem);
        }}
        style={{
          cursor: "pointer",
          width: "20px",
          height: "20px",
          backgroundColor: `${colorItem}`,
        }}></div>
    );
  });

  const sizeOptions = sizeList.map((sizeItem) => {
    return <option value={sizeItem.value}>{sizeItem.name}</option>;
  });

  return (
    <div className="tool-board">
      <p>Shapes: </p>
      <ul>
        <li
          className={
            options.shape === "rectangle"
              ? "option-shape selected"
              : "option-shape"
          }
          onClick={() => {
            handleShapeSelect("rectangle");
          }}>
          <svg width="30" height="25">
            <rect width="10" height="10" x="5" y="9" />
          </svg>
          <span>Rectangle</span>
        </li>
        <li
          className={
            options.shape === "circle"
              ? "option-shape selected"
              : "option-shape"
          }
          onClick={() => {
            handleShapeSelect("circle");
          }}>
          <svg width="30" height="25">
            <circle cx="10" cy="9" r="6" />
          </svg>
          <span>Circle</span>
        </li>
        <li
          className={
            options.shape === "line" ? "option-shape selected" : "option-shape"
          }
          onClick={() => {
            handleShapeSelect("line");
          }}>
          <svg width="30" height="25">
            <line x1="0" y1="0" x2="20" y2="15" stroke="black" />
          </svg>
          <span>Line</span>
        </li>
      </ul>
      <p>Colors: </p>
      <div className="color-panel">{colorGrid}</div>
      <p>Size: </p>
      <div>
        <select
          value={options.size}
          className="size-select"
          onChange={(e) => {
            handleSizeOptionClick(Number(e.target.value));
          }}>
          {sizeOptions}
        </select>
      </div>
      <button className="btn-clear" onClick={handleButtonClearClick}>
        Clear
      </button>
      <button className="btn-clear" onClick={publishDraw}>
        Publish
      </button>
    </div>
  );
};

export default DrawTools;
