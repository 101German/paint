import React, { FC } from 'react';
import "./DrawTools.css"
import { Option } from '../../Models/Option';


interface DrawToolsProps {
  handleOptionChange: (color: Option) => void;
  options: Option;
}
const colorList = ["red", "green", "blue", "yellow", "black", "pink", "orange", "brown"];
const sizeList = ["Thin", "Normal", "Bold"];
const sizeOptions = sizeList.map((sizeItem) =>{
  return <option value={sizeItem}>{sizeItem}</option>
})

const DrawTools: FC<DrawToolsProps> = ({ handleOptionChange,options}) =>{

  const handleColorGridClick = (color: string)=>{
    const newOptions = Object.assign({}, options);
    newOptions.color = color;
    handleOptionChange(newOptions)
  }

  const colorGrid = colorList.map((colorItem) => {
    return <div key={colorItem} onClick={()=>{handleColorGridClick(colorItem)}} style={{width:"20px", height:"20px", backgroundColor:`${colorItem}`}}></div>
  })

  return(
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
        <svg width="30" height="25" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="9" r="6"/>
         </svg>
         <span>Circle</span>
        </li>
        <li  className="option-shape">
        <svg width="30" height="25">
           <line x1="0" y1="0" x2="20" y2="15" stroke='black'/>
        </svg>
         <span>Line</span>
        </li>
      </ul>
      <p>Colors: </p>
       <div className="color-panel">
        {colorGrid}
       </div>
       <p>Size: </p>
       <div>
       <select className="size-select">
          {sizeOptions}
       </select>
       </div>
       <button className="btn-clear">Clear</button>
    </div>
  )
}


export default DrawTools;