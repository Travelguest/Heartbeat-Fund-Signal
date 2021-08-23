/*
Component: src/component/D3Demo/D3Demo.tsx
Created with;
$ npx generate-react-cli component D3Demo --type=d3
*/

import React, { useEffect, RefObject } from 'react';
// import './index.less';
import * as d3 from 'd3';

const D3Demo = (props: ID3DemoProps) => {
  const ref: RefObject<HTMLDivElement> = React.createRef();

  const onMouseOverHandler = (event: React.MouseEvent<SVGCircleElement, MouseEvent>) => {
    console.log('over!!', event);
  };

  const drawChart = () => {
    const width = 500;
    const height = 500;
    const rectWidth = 50;
    const svg = d3.select(ref.current).append('svg').attr('width', width).attr('height', height);
    // svg
    //   .selectAll('rect')
    //   .data(props.data)
    //   .enter()
    //   .append('rect')
    //   .attr('x', (_, i) => 5 + i * (rectWidth + 5))
    //   .attr('y', (d) => width - d)
    //   .attr('width', rectWidth)
    //   .attr('height', (d) => d)
    //   .style('fill', 'tomato');

    const circle = svg
      .append('g')
      .append('circle')
      .attr('transform', 'translate(150,150)')
      .attr('class', 'circle')
      .attr('width', width)
      .attr('height', height)
      .attr('r', 50)
      .style('fill', 'none')
      .style('stroke', 'tomato')
      .on('click', () => {
        // alert('onClick');
      })
      .on('mouseover', (event) => {
        onMouseOverHandler(event);
      });
    (function repeat() {
      circle
        .transition()
        .duration(3000)
        .attr('stroke-width', 10)
        .attr('stroke-opacity', 1)
        .transition()
        .duration(3000)
        .attr('stroke-width', 0)
        .attr('stroke-opacity', 0.5)
        .transition()
        .duration(1000)
        .attr('stroke-width', 25)
        .attr('stroke-opacity', 0)
        .ease(d3.easeSin)
        .on('end', repeat);
    })();
  };

  useEffect(() => {
    drawChart();
  });

  return <div className='D3Demo' ref={ref} />;
};

interface ID3DemoProps {
  // data: number[];
}

export default D3Demo;
