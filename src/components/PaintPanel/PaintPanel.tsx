import React, { FC } from 'react';
import styles from './PaintPanel.module.css';

interface PaintPanelProps {}

const PaintPanel: FC<PaintPanelProps> = () => (
  <div className={styles.PaintPanel}>
    PaintPanel Component
  </div>
);

export default PaintPanel;
