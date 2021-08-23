/*
Component: src/component/LineChart/LineChart.tsx
Created with;
$ npx generate-react-cli component LineChart --type=d3
*/

import React, { useState, useEffect, RefObject } from 'react';
import './index.less';
import * as d3 from 'd3';

interface LineChartProps {
  date: string;
  value: string | number;
}

const LineChart = () /* or ( props : ILineChartProps ) */ => {
  // const [myState, setMyState] = useState<boolean>(true);
  const ref: RefObject<HTMLDivElement> = React.createRef();
  const margin = { top: 10, right: 30, bottom: 30, left: 60 };
  const width = 460 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;
  let data: LineChartProps[] = [];
  let svg: any;

  const renderInit = () => {
    d3.csv('https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv')
      .then((d: any) => {
        data = d.map((item: LineChartProps) => ({ date: d3.timeParse('%Y-%m-%d')(item.date), value: item.value }));
        console.log(data);
        return null;
      })
      .catch((error) => {
        console.error('error:', error);
      });
    svg = d3
      .select(ref.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);
    svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);
  };

  const draw = () => {
    renderInit();
  };

  useEffect(() => {
    draw();
  });

  return <div className='LineChart' ref={ref} />;
};

/*
interface ILineChartProps {
  // TODO
}
*/

export default LineChart;
