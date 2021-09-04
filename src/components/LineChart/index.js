import React, { useState, useEffect, RefObject } from 'react';
import moment from 'moment';
import axios from 'axios';
import { DatePicker } from 'antd';
import { Line } from '@ant-design/charts';
import styles from './index.less';

const { RangePicker } = DatePicker;
const LineChart = () /* or ( props : ILineChartProps ) */ => {
  const [data, setData] = useState([]);
  const [hackTime, setHackTime] = useState();
  const [time, setTime] = useState();

  const disabledDate = (current) => {
    return current && current > moment().locale('zh-cn');
  };

  const onOpenChange = (open) => {
    if (open) {
      setHackTime([]);
    } else {
      setHackTime(undefined);
    }
  };

  const asyncGet = () => {
    axios
      .get('https://gw.alipayobjects.com/os/bmw-prod/e00d52f4-2fa6-47ee-a0d7-105dd95bde20.json')
      .then(({ data }) => {
        // console.log(data);
        return setData(data);
      })
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  useEffect(() => {
    asyncGet();
  }, []);
  // 可以用数组来生成多个点
  const annotations = [
    {
      type: 'dataMarker',
      position: ['2008', 4594306848763.08],
      text: {
        content: '2月份因逢春节水产销售需求旺盛\uFF0C\n需求大增',
        style: { textAlign: 'left' },
      },
      point: {
        style: {
          fill: '#f5222d',
          stroke: '#f5222d',
        },
      },
    },
    {
      type: 'dataMarker',
      top: true,
      position: ['2008', 14448933025000],
      text: {
        content: '需求大增',
        style: { textAlign: 'left' },
      },
      point: {
        style: {
          fill: '#f5222d',
          stroke: '#f5222d',
        },
      },
    },
  ];
  const config = {
    data,
    xField: 'year',
    yField: 'gdp',
    seriesField: 'name',
    xAxis: { tickCount: 10 },
    yAxis: {
      label: {
        formatter: (v) => `${(v / 10e8).toFixed(1)} B`,
      },
    },
    legend: {
      position: 'top',
    },
    point: {
      shape: ({ name }) => {
        return name === 'China' ? 'square' : 'circle';
      },
      style: ({ year }) => {
        return {
          r: Number(year) % 4 ? 0 : 3, // 4个数据示一个点标记
        };
      },
    },
    slider: {
      start: 0.1,
      end: 0.9,
    },
    annotations,
  };
  return (
    <div className={styles['line-chart-container']}>
      <div className={styles['time-selection-container']}>
        选择时间：
        <RangePicker
          value={hackTime || time}
          disabledDate={disabledDate}
          onChange={(val) => setTime(val)}
          onOpenChange={onOpenChange}
        />
      </div>
      <div className={styles['line-chart']}>
        <Line {...config} />
      </div>
    </div>
  );
};

/*
interface ILineChartProps {
  // TODO
}
*/

export default LineChart;
