import React from 'react';
import styles from './index.less';

export interface IRectangularTreeDiagramProps {
    
};

const RectangularTreeDiagram: React.FC<IRectangularTreeDiagramProps> = (props) => {
  console.log('styles: ', styles);
  return (
    <div className={styles.container}>123</div>
  )
};

export default RectangularTreeDiagram;