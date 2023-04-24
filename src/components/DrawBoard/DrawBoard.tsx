import React, { FC, useEffect, useRef } from 'react';
import "./DrawBoard.css"
import { Option } from '../../Models/Option';

interface DrawBoardProps {
   options: Option
}

const DrawBoard: FC<DrawBoardProps> = ({
   options
}) =>{

let ctx : CanvasRenderingContext2D | null;
let startX;
let startY;
let isDraw = false;
let canvasOffsetX: number;
let canvasOffsetY: number;

let canvasRef = useRef<HTMLCanvasElement>(null); 

useEffect(()=>{
if(canvasRef.current){
ctx = canvasRef.current.getContext('2d');
ctx!.lineCap = 'round';
ctx!.lineWidth = 5;
canvasOffsetX = canvasRef.current.offsetLeft;
canvasOffsetY = canvasRef.current.offsetTop;
console.log(options.color);
ctx!.strokeStyle = options.color;
}
},[options]);

const handleMouseDown = (e:any) =>{
   isDraw = true;
   startX = e.clientX;
   startY = e.clientY;
   console.log("down");
}



const handleMouseUp = (e:any) => {
  if(ctx != null){
   isDraw = false;
   ctx.stroke();
   ctx.beginPath();
   console.log("up")
  }
}

const handleMouseMove = (e:any) =>{
if(isDraw){
   ctx?.lineTo(e.clientX - canvasOffsetX,e.clientY - canvasOffsetY);
   ctx?.stroke();
}
console.log("move")
}

   return(
   <div className="drawing-board">
      <canvas ref={canvasRef} className="draw-payload"
       onMouseDown={handleMouseDown}
       onMouseUp={handleMouseUp}
       onMouseMove={handleMouseMove}
       width="739px"
       height="450px"></canvas>
    </div>)
}

export default DrawBoard;