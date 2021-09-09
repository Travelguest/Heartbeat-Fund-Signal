import React, { useEffect, useState } from 'react';
import { DecompositionTreeGraph } from '@ant-design/charts';
import { getTreeChart } from 'Utils/api';
import * as d3 from 'd3';

const DisassemblyTree = (props) => {
  const { time } = props;
  const [data, setData] = useState({});
  const colorScale = [
    '#8dd3c7',
    '#ffffb3',
    '#bebada',
    '#fb8072',
    '#80b1d3',
    '#fdb462',
    '#b3de69',
    '#fccde5',
    '#d9d9d9',
    '#bc80bd',
    '#ccebc5',
    '#ffed6f',
    '#66c2a5',
    '#fc8d62',
    '#8da0cb',
    '#e78ac3',
    '#a6d854',
    '#ffd92f',
    '#e5c494',
    '#b3b3b3',
    '#4e79a7',
  ];

  useEffect(() => {
    getTreeChart(time)
      .then(({ content }) => {
        setData(content);
        return content;
      })
      .catch((err) => {
        console.error(err);
      });
  }, [time]);
  const config = {
    data,
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-node'], // ,
    nodeCfg: {
      anchorPoints: [
        [0, 0.18],
        [1, 0.18],
      ],
      title: {
        containerStyle: {
          fill: 'transparent',
        },
        style: (cfg) => {
          return { fill: colorScale[cfg?.value?.color_label] ?? 'black' };
        },
      },
      items: {
        containerStyle: {
          // fill: 'red',
          opacity: 0,
        },
      },
      style: {
        width: 60,
        height: 0,
        stroke: 'transparent',
        opacity: 0,
      },
      nodeStateStyles: false,
    },

    level: 1,
    autoFit: true,
    edgeCfg: {
      endArrow: {
        show: false,
      },
      style: (item, graph) => {
        // console.log('item:', item, graph.findById(item.source));
        /**
         * graph.findById(item.target).getModel()
         * item.source: 获取 source 数据
         * item.target: 获取 target 数据
         */
        // console.log(graph.findById(item.source).getModel());
        return {
          stroke: '#8dd3c7',
          lineWidth: 2,
          lineLength: 1,
          strokeOpacity: 0.5,
        };
      },
      edgeStateStyles: false,
    },
    layout: {
      direction: 'LR',
      getWidth: (size) => {
        // 用于计算布局的节点宽度，建议设置为 size[0]
        return 10;
      },
      getHGap: () => {
        // 每个节点的水平间隙，会结合 getWidth 返回值使用
        return 40;
      },
    },
  };
  return (
    <div className='disassembly-tree-container'>
      <DecompositionTreeGraph {...config} />
    </div>
  );
};

export default DisassemblyTree;
