import React, { useEffect } from 'react';
import { Treemap } from '@antv/g2plot';
import styles from './index.less';
// eslint-disable-next-line import/extensions
import data from './data.json';

export interface IRectangularTreeDiagramProps {}

const RectangularTreeDiagram: React.FC<IRectangularTreeDiagramProps> = () => {
  const render = () => {
    const treemapPlot = new Treemap(styles.container, {
      data,
      colorField: 'name',
      legend: {
        position: 'top-left',
      },
      drilldown: {
        enabled: true,
        breadCrumb: {
          rootText: '投资组合',
          position: 'top-left',
        },
      },
      tooltip: {
        formatter: (v) => {
          const root = v.path[v.path.length - 1];
          return {
            name: v.name,
            value: `${v.value}(总占比${((v.value / root.value) * 100).toFixed(2)}%)`,
          };
        },
      },
    });

    treemapPlot.render();
  };

  useEffect(() => {
    render();
  }, []);

  return <div id={styles.container} />;
};

export default RectangularTreeDiagram;
