import React, { FC } from 'react';
import styles from './Paint.module.css';
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
  <div className={styles.container}>
    <Routes>
      <Route path="/" element={
        <div className={styles.paint}>
        <Header/>
        </div>
      }/>
      <Route path="/draw" element ={
        <PaintPanel/>
      }/>
    </Routes>
  </div>
);

export default Paint;
