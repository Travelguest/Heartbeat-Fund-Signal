import React from 'react';
import { Pie } from '@ant-design/charts';
import './index.less';

const RingChart = () => {
  const data = [
    {
      type: '分类一',
      value: 27,
    },
    {
      type: '分类二',
      value: 25,
    },
    {
      type: '分类三',
      value: 18,
    },
    {
      type: '分类四',
      value: 15,
    },
    {
      type: '分类五',
      value: 10,
    },
    {
      type: '其他',
      value: 5,
    },
    {
      type: '其他1',
      value: 5,
    },
    {
      type: '其他2',
      value: 5,
    },
  ];
  const config = {
    appendPadding: 20,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.7,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          fontSize: 18,
        },
        content: '股票配置',
        offsetX: -150,
        offsetY: -180,
      },
    },
    legend: {
      layout: 'vertical',
      position: 'right',
      // offsetX: -200,
    },
  };
  return <Pie {...config} />;
};

export default RingChart;
