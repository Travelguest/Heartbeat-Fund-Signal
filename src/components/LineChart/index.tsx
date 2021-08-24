/*
Component: src/component/LineChart/LineChart.tsx
Created with;
$ npx generate-react-cli component LineChart --type=d3
*/

import React, { useState, useEffect, RefObject } from 'react';
import './index.less';
import { Line } from '@ant-design/charts';

interface LineChartProps {
  date: string;
  value: string | number;
}

const LineChart: React.FC = () /* or ( props : ILineChartProps ) */ => {
  // const [myState, setMyState] = useState<boolean>(true);
  const ref: RefObject<HTMLDivElement> = React.createRef();
  const data: LineChartProps[] = [
    { date: '1991', value: 3 },
    { date: '1992', value: 4 },
    { date: '1993', value: 3.5 },
    { date: '1994', value: 5 },
    { date: '1995', value: 4.9 },
    { date: '1996', value: 6 },
    { date: '1997', value: 7 },
    { date: '1998', value: 9 },
    { date: '1999', value: 13 },
  ];

  const config = {
    data,
    height: 400,
    xField: 'year',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond',
    },
  };

  // useEffect(() => {
  //   // renderInit();
  // });

  return (
    <div className='line-chart-container' ref={ref}>
      <Line {...config} />
    </div>
  );
};

/*
interface ILineChartProps {
  // TODO
}
*/

export default LineChart;
