import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import axios from 'axios';
import { DatePicker } from 'antd';
// import { Line } from '@ant-design/charts';
import { Line } from '@antv/g2plot';
import { getLineChartInfo } from 'Utils/api';
import styles from './index.less';

const { RangePicker } = DatePicker;
const LineChart = () /* or ( props : ILineChartProps ) */ => {
  const [data, setData] = useState([]);
  const [hackTime, setHackTime] = useState(null);
  const [time, setTime] = useState([moment('2020-01-10'), moment('2020-02-03')]);
  const [paramsTime, setParamsTime] = useState(['2020-01-10', '2020-02-03']);
  const lineRef = useRef();

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

  const onChange = (date, dateString) => {
    setParamsTime(dateString);
    setTime(date);
  };
  // 可以用数组来生成多个点
  const annotations = [
    {
      type: 'dataMarker',
      position: ['2020-01-10', 1.00112],
      text: {
        content: 'yuncaijing:高盛：建议2020年买入人民币',
        style: { textAlign: 'left' },
      },
      point: {
        style: {
          fill: '#f5222d',
          stroke: '#f5222d',
        },
      },
    },
    // {
    //   type: 'dataMarker',
    //   top: true,
    //   position: ['2008', 14448933025000],
    //   text: {
    //     content: '需求大增',
    //     style: { textAlign: 'left' },
    //   },
    //   point: {
    //     style: {
    //       fill: '#f5222d',
    //       stroke: '#f5222d',
    //     },
    //   },
    // },
  ];
  useEffect(() => {
    getLineChartInfo(paramsTime)
      .then(({ content }) => {
        console.log('LineChart:', content);
        // 处理数据中的新闻
        content.forEach((item) => {
          if (item.news) {
            annotations.push({
              type: 'dataMarker',
              position: [item.date, item.value],
              top: true,
              text: {
                content: item.news.content,
                style: { textAlign: 'left' },
              },
              point: {
                style: {
                  fill: '#f5222d',
                  stroke: '#f5222d',
                },
              },
            });
          }
        });
        console.log('annotations:', annotations);
        return setData(content);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [paramsTime]);

  const render = () => {
    console.log('开始', styles['line-chart']);
    const line = new Line(styles['line-chart'], {
      data,
      padding: 'auto',
      xField: 'date',
      yField: 'value',
      seriesField: 'name',
      xAxis: { tickCount: 10 },
      yAxis: {
        label: {
          formatter: (v) => `${Number(v).toFixed(2)}`,
        },
      },
      legend: {
        position: 'top',
      },
      slider: {
        start: 0.1,
        end: 0.9,
      },
      annotations,
    });
    lineRef.current = line;
    line.render();
  };

  useEffect(() => {
    render();
  }, []);

  useEffect(() => {
    lineRef.current.update(annotations);
    lineRef.current.changeData(data);
  }, [data, annotations]);
  const config = {
    data,
    xField: 'date',
    yField: 'value',
    seriesField: 'name',
    xAxis: { tickCount: 10 },
    yAxis: {
      label: {
        // formatter: (v) => `${(v / 10e8).toFixed(1)} B`,
        formatter: (v) => `${Number(v).toFixed(2)}`,
      },
    },
    legend: {
      position: 'top',
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
          onChange={onChange}
          onOpenChange={onOpenChange}
        />
      </div>
      <div id={styles['line-chart']}>{/* <Line {...config} /> */}</div>
    </div>
  );
};

/*
interface ILineChartProps {
  // TODO
}
*/

export default LineChart;
