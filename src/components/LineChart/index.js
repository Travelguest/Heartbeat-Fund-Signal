import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import axios from 'axios';
import { DatePicker } from 'antd';
// import { Line } from '@ant-design/charts';
import { Line } from '@antv/g2plot';
import { getLineChartInfo } from 'Utils/api';
import { tuple } from 'antd/lib/_util/type';
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
  const [annotations, setAnnotations] = useState([]);
  useEffect(() => {
    getLineChartInfo(paramsTime)
      .then(({ content }) => {
        // console.log('LineChart:', content);
        // 处理数据中的新闻
        const newAnnotations = annotations.slice();
        content.forEach((item) => {
          if (item.news) {
            newAnnotations.push({
              type: 'dataMarker',
              position: [item.date, item.value],
              top: true,
              autoAdjust: true,
              text: {
                maxLength: 100,
                autoEllipsis: true,
                content: item.news.content,
                style: { textAlign: 'center', opacity: 1 },
              },
              line: {
                length: 12,
                style: {
                  opacity: 1,
                },
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
        console.log('annotations:', newAnnotations);
        setAnnotations(newAnnotations);
        return setData(content);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [paramsTime]);
  const options = {
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
  };
  const render = () => {
    const line = new Line(styles['line-chart'], options);
    lineRef.current = line;
    line.render();
    line.on('annotation:click', (event) => {
      console.log(event);
    });
  };

  useEffect(() => {
    render();
  }, []);

  useEffect(() => {
    lineRef.current.update({ ...options, annotations });
    lineRef.current.changeData(data);
  }, [data, annotations]);
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
