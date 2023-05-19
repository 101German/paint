import React, { FC, useState } from 'react';
import "./PaintPanel.css";
import DrawTools from '../DrawTools/DrawTools';
import DrawBoard from '../DrawBoard/DrawBoard';
import { Option } from '../../Models/Option';

interface PaintPanelProps {}

const PaintPanel: FC<PaintPanelProps> = () => {
  
  const [options, setOptions] = useState({color:"green"})

  const handleOptionChange = (option:Option) =>{
    setOptions(option)    
  }

  return(
  <div className="paint-panel-container">
  <div className="paint-panel">
    <DrawTools handleOptionChange={handleOptionChange} options={options} />
    <DrawBoard options={options}/>
  </div>
  </div>)
};

export default PaintPanel;
