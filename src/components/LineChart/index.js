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

  const divStyles = {
    position: 'absolute',
    background: 'rgba(255,255,255,0.95)',
    boxShadow: 'rgb(174, 174, 174) 0px 0px 10px',
    borderRadius: '4px',
    padding: '20px',
  };

  const setStyles = (container, styles) => {
    for (const key in styles) {
      container.style[key] = styles[key];
    }
  };

  useEffect(() => {
    getLineChartInfo(paramsTime)
      .then(({ content }) => {
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
    meta: {
      value: {
        max: 1.5,
        min: 0.8,
      },
    },
    legend: {
      position: 'top',
    },
    slider: {
      start: 0.1,
      end: 0.9,
    },
    tooltip: {
      customContent: (value, items) => {
        const container = document.createElement('div');
        setStyles(container, divStyles);
        const frag = document.createDocumentFragment();
        const title = document.createElement('div');
        title.innerHTML = `${value}`;
        frag.appendChild(title);
        items.forEach((d) => {
          const li = document.createElement('li');
          li.innerHTML = `${d?.name}:${d?.value}`;
          li.style.color = `${d?.color}`;
          frag.appendChild(li);
        });
        const news = document.createElement('li');
        news.innerHTML = `今日头条：${items[0]?.data?.news?.content ?? '无'}`;
        frag.appendChild(news);
        const content = `
          <div>
            <div>${value}</div>
            <div>
              ${items[0]?.name}:${items[0]?.value}
            </div>
            <div>
              ${items[1]?.name}:${items[1]?.value}
            </div>
            <div>今日头条：${items[0]?.data?.news?.content ?? '无'}</div>
          </div>
        `;
        container.appendChild(frag);
        return container;
      },
    },
  };
  const render = () => {
    const line = new Line(styles['line-chart'], options);
    lineRef.current = line;
    line.render();
  };

  useEffect(() => {
    render();
  }, []);

  useEffect(() => {
    lineRef.current.changeData(data);
  }, [data]);
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
