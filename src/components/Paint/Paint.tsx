import React, { FC } from 'react';
import './Paint.css';
import Header from '../Header/Header';
import PaintPanel from '../PaintPanel/PaintPanel';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

interface PaintProps {}

const Paint: FC<PaintProps> = () => (
    <Routes>
      <Route path="/" element={
        <div className="paint-container">
        <Header/>
        </div>
      }/>
      <Route path="/draw" element ={
        <PaintPanel/>
      }/>
    </Routes>
);

export default Paint;
