/* eslint-disable react/prop-types */
import React from 'react';
import { Pie } from '@ant-design/charts';
import './index.less';

const RingChart = (props) => {
  const toPercent = (point) => {
    let str = Number(point * 100);
    str += '%';
    return str;
  };
  const { data } = props;
  // const sum = data.reduce(
  //   (pre, cur) => {
  //     return { value: pre.value + cur.value };
  //   },
  //   { value: 0 },
  // );

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
        formatter: () => {
          return '';
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
