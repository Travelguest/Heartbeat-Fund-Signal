import React from 'react';
import { Pie } from '@ant-design/charts';
import './index.less';

const RingChart = () => {
  const toPercent = (point) => {
    let str = Number(point * 100).toFixed(2);
    str += '%';
    return str;
  };
  const data = [
    {
      type: '传媒',
      value: 27,
    },
    {
      type: '银行',
      value: 25,
    },
    {
      type: '现金',
      value: 18,
    },
    {
      type: '非银金融',
      value: 15,
    },
  ];
  const sum = data.reduce((pre, cur) => {
    return { value: pre.value + cur.value };
  });

  const config = {
    appendPadding: 20,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.5,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [{ type: 'element-active' }, { type: 'legend-active' }, { type: 'legend-filter', enable: false }],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          fontSize: 18,
        },
        content: '',
      },
    },
    legend: {
      layout: 'vertical',
      position: 'bottom',
      flipPage: false,
      itemValue: {
        style: {
          fontSize: 12,
        },
        space: 50,
        formatter: (text, item, index) => {
          return toPercent(data[index].value / sum.value);
        },
      },
    },
  };
  return (
    <div className='ring-chart-container'>
      <div className='title'>股票配置</div>
      <Pie {...config} />
    </div>
  );
};

export default RingChart;
