import React, { FC } from 'react';
import styles from './Header.module.css';

interface HeaderProps {}

const Header: FC<HeaderProps> = () => (
  <div className={styles.Header}>
    <p className={styles.paint_logo}>Paint</p>
    <div><button className={styles.draw_button}>Draw</button></div>
  </div>
);

export default Header;
