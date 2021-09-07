import React, { useState, useEffect, useRef } from 'react';
import { Treemap } from '@antv/g2plot';
import { getRectangularTreeDiagram } from 'Utils/api';
import styles from './index.less';
// eslint-disable-next-line import/extensions
// import data from './newData.json';

export interface IRectangularTreeDiagramProps {
  time: string;
}

const RectangularTreeDiagram = (props: IRectangularTreeDiagramProps) => {
  const { time } = props;
  const [data, setData] = useState({});
  const treemapRef = useRef<Treemap>();
  const render = () => {
    console.log('康康：', styles.container);
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
    treemapRef.current = treemapPlot;
    // 通过图表构造方法创建实例之后，调用这个方法，可以将图表渲染到指定的 DOM 容器中。
    treemapPlot.render();
  };
  useEffect(() => {
    getRectangularTreeDiagram(time)
      .then(({ content }) => {
        console.log('RectangularTree;', content);
        // 嵌套矩形树图中，布局由叶子节点的 value 值决定。
        // 故需要给每个children乘上父结点的value作为权重配比
        // content.children.forEach((item: any) => {
        //   if (Array.isArray(item.children) && item.children.length > 0) {
        //     item.children.forEach((child: any, index: number, arr: any[]) => {
        //       arr[index].value *= item.value; // 每个children乘上父结点的value作为权重配比
        //     });
        //   }
        // });
        setData(content);
        return content;
      })
      .catch((err) => {
        console.error(err);
      });
  }, [time]);

  useEffect(() => {
    render();

    return () => {
      treemapRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    // 通过这个方法，可以修改图表的数据，并自动重新渲染
    treemapRef.current?.changeData(data);
  }, [data]);

  return <div id={styles.container} />;
};

export default RectangularTreeDiagram;
