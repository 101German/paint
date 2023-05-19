import React, { FC, useEffect } from "react";
import "./DrawBoard.css";
import { Option } from "../../Models/Option";
import { auth } from "../../config";
import { onAuthStateChanged } from "firebase/auth";

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

  const handleMouseDown = (e: any) => {
    startX = e.clientX;
    startY = e.clientY;
    console.log("point ", startX, startY)
    isDraw = true;
  };

  const handleMouseUp = (e: any) => {
    if (ctx !== null) {
      ctx.stroke();
      ctx.beginPath();
      isDraw = false;
    }
  };

  const handleMouseMove = (e: any) => {
    if (isDraw) {
      ctx?.lineTo(e.clientX - canvasOffsetX, e.clientY - canvasOffsetY);
      ctx?.stroke();
    }
  };

  const startDraw = (e: any) => {
    startX = e.clientX - canvasOffsetX;
    startY = e.clientY - canvasOffsetY;
    ctx?.beginPath();
    if (options.shape === "line") {
      ctx?.moveTo(startX, startY);
    }
    isDraw = true;
  }

  const drawRect = (e: any) => {
    if (isDraw) {
      console.log("x , y", startX, startY)
      const mouseX = e.clientX - canvasOffsetX;
      const mouseY = e.clientY - canvasOffsetY;
      console.log("mouse x,y", mouseX, mouseY)

      rectWidth = mouseX - startX;
      rectHeight = mouseY - startY;

      if (ctx != null) {
        ctx.beginPath();
        ctx.rect(startX, startY, rectWidth, rectHeight);
      }
    }
  }

  const drawArc = (e: any) => {
    const mouseX = e.clientX - canvasOffsetX;
    const r = Math.abs(mouseX - startX);
    ctx?.beginPath();
    ctx?.arc(startX, startY, r, 0, 2 * Math.PI);
  }

  const drawLine = (e: any) => {
    const mouseX = e.clientX - canvasOffsetX;
    const mouseY = e.clientY - canvasOffsetY;
    //ctx?.lineTo(mouseX, mouseY);
  }

  const stopDraw = () => {
    isDraw = false;
    if (ctx != null) {
      ctx.stroke();
    }
  }

  const stopDrawLine = (e: any) => {
    const mouseX = e.clientX - canvasOffsetX;
    const mouseY = e.clientY - canvasOffsetY;
    ctx?.lineTo(mouseX, mouseY);
    ctx?.stroke();
    isDraw = false;
  }

  return (
    <div className="drawing-board">
      <canvas
        ref={canvasRef}
        className="draw-payload"
        onMouseDown={startDraw}
        onMouseUp={ (e) => {
          if (options.shape === "line") {
            stopDrawLine(e)
          } else {
            stopDraw()
          }
        }}
        onMouseMove={(e) => {
          switch (options.shape) {
            case "rectangle":
              drawRect(e);
              break;
            case "circle":
              drawArc(e);
              break;
            case "line":
              break;
            default:
              handleMouseMove(e);
              break;
          }
        }}
        width="739px"
        height="450px"
      ></canvas>
    </div>
  );
};

export default DrawBoard;
