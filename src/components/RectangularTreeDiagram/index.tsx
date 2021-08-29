import React, { useEffect } from 'react';
import styles from './index.less';
import data from './data.json';
import { Treemap } from '@antv/g2plot';

export interface IRectangularTreeDiagramProps {

};

const RectangularTreeDiagram: React.FC<IRectangularTreeDiagramProps> = (props) => {

  const render = () => {
    const treemapPlot = new Treemap(styles.container, {
      data,
      colorField: 'name',
      legend: {
        position: 'top-left',
      },
      interactions: [
        {
          type: 'treemap-drill-down',
        },
      ],
      tooltip: {
        formatter: (v) => {
          const root = v.path[v.path.length - 1];
          return {
            name: v.name,
            value: `${v.value}(总占比${((v.value / root.value) * 100).toFixed(2)}%)`,
          };
        },
      }
    });

    treemapPlot.render();
  };

  useEffect(() => {
    // render();
  }, []);

  return (
    <div className={styles.container}></div>
  );
};

export default RectangularTreeDiagram;