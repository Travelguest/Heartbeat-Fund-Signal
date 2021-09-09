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
        [0, 0.2],
        [1, 0.2],
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
          fill: '#fff',
        },
      },
      style: { width: 90, height: 10, stroke: 'transparent' },
      nodeStateStyles: false,
    },
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
  };
  return (
    <div className='disassembly-tree-container'>
      <DecompositionTreeGraph {...config} />
    </div>
  );
};

export default DisassemblyTree;
