import React, { FC } from 'react';
import styles from './Paint.module.css';
import Header from '../Header/Header';

interface PaintProps {}

const Paint: FC<PaintProps> = () => (
  <div className={styles.Paint}>
    <Header/>
  </div>
);

export default Paint;
