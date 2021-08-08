/*
Component: src/component/D3Demo/D3Demo.tsx
Created with;
$ npx generate-react-cli component D3Demo --type=d3
*/

import React, { useState, useEffect, RefObject } from 'react';
// import './D3Demo.less';
import * as d3 from 'd3';

const D3Demo = () /* or ( props : ID3DemoProps ) */ => {
  const [myState, setMyState] = useState<boolean>(true);
  const ref: RefObject<HTMLDivElement> = React.createRef();

  const draw = () => {
    d3.select(ref.current).append('p').text('Hello World');
    d3.select('svg')
      .append('g')
      .attr('transform', 'translate(250, 0)')
      .append('rect')
      .attr('width', 500)
      .attr('height', 500)
      .attr('fill', 'tomato');
  };

  useEffect(() => {
    draw();
  });

  return (
    <div className='D3Demo' ref={ref}>
      <svg width='500' height='500'>
        <g transform='translate(0, 0)'>
          <rect width='500' height='500' fill='green' />
        </g>
      </svg>
    </div>
  );
};

/*
interface ID3DemoProps {
  // TODO
}
*/

export default D3Demo;
