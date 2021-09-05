import React, { useEffect } from 'react';
import { Treemap } from '@antv/g2plot';
import { getRectangularTreeDiagram } from 'Utils/api';
import styles from './index.less';
// eslint-disable-next-line import/extensions
import data from './data.json';

export interface IRectangularTreeDiagramProps {
  time: string;
}

const RectangularTreeDiagram = (props: IRectangularTreeDiagramProps) => {
  const { time } = props;
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
    getRectangularTreeDiagram(time)
      .then((res) => {
        console.log('res;', res);
        // 嵌套矩形树图中，布局由叶子节点的 value 值决定。
        // 故需要给每个children乘上父结点的value作为权重配比
        return res;
      })
      .catch((err) => {
        console.error(err);
      });
    render();
  }, [time]);

  return <div id={styles.container} />;
};

export default RectangularTreeDiagram;
