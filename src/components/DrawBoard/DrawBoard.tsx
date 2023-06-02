import React, { FC, useEffect } from "react";
import "./DrawBoard.css";
import { Option } from "../../Models/Option";

interface DrawBoardProps {
  options: Option;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

const DrawBoard: FC<DrawBoardProps> = ({ options, canvasRef }) => {
  let ctx: CanvasRenderingContext2D | null;
  let startX: number;
  let startY: number;
  let canvasOffsetX: number;
  let canvasOffsetY: number;
  let isDraw = false;
  let canvas: HTMLCanvasElement;
  let rectWidth: number;
  let rectHeight: number;

  useEffect(() => {
    if (canvasRef.current !== null) {
      canvas = canvasRef.current;
      ctx = canvas.getContext("2d");
      if (ctx !== null) {
        ctx.lineCap = "round";
        ctx.lineWidth = options.size;
        ctx.strokeStyle = options.color;
        ctx.fillStyle = options.color;
      }
      canvasOffsetX = canvas.offsetLeft;
      canvasOffsetY = canvas.offsetTop;
    }
  }, [options]);

  const handleMouseMove = (clientX: number, clientY: number) => {
    if (isDraw) {
      ctx?.lineTo(clientX - canvasOffsetX, clientY - canvasOffsetY);
      ctx?.stroke();
    }
  };

  const startDraw = (clientX: number, clientY: number) => {
    startX = clientX - canvasOffsetX;
    startY = clientY - canvasOffsetY;
    ctx?.beginPath();
    if (options.shape === "line") {
      ctx?.moveTo(startX, startY);
    }
    isDraw = true;
  };

  const drawRect = (clientX: number, clientY: number) => {
    if (isDraw) {
      const mouseX = clientX - canvasOffsetX;
      const mouseY = clientY - canvasOffsetY;
      rectWidth = mouseX - startX;
      rectHeight = mouseY - startY;
      if (ctx !== null) {
        ctx.beginPath();
        ctx.rect(startX, startY, rectWidth, rectHeight);
      }
    }
  };

  const drawArc = (clientX: number) => {
    const mouseX = clientX - canvasOffsetX;
    const r = Math.abs(mouseX - startX);
    ctx?.beginPath();
    ctx?.arc(startX, startY, r, 0, 2 * Math.PI);
  };

  const stopDraw = () => {
    isDraw = false;
    if (ctx !== null) {
      ctx.stroke();
    }
  };

  const stopDrawLine = (clientX: number, clientY: number) => {
    const mouseX = clientX - canvasOffsetX;
    const mouseY = clientY - canvasOffsetY;
    ctx?.lineTo(mouseX, mouseY);
    ctx?.stroke();
    isDraw = false;
  };

  return (
    <div className="drawing-board">
      <canvas
        ref={canvasRef}
        className="draw-payload"
        onMouseDown={(e) => {
          startDraw(e.clientX, e.clientY);
        }}
        onMouseUp={(e) => {
          if (options.shape === "line") {
            stopDrawLine(e.clientX, e.clientY);
          } else {
            stopDraw();
          }
        }}
        onMouseMove={(e) => {
          switch (options.shape) {
            case "rectangle":
              drawRect(e.clientX, e.clientY);
              break;
            case "circle":
              drawArc(e.clientX);
              break;
            case "line":
              break;
            default:
              handleMouseMove(e.clientX, e.clientY);
              break;
          }
        }}
        width="739px"
        height="450px"></canvas>
    </div>
  );
};

export default DrawBoard;
